"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db_1 = __importDefault(require("../db"));
const Email_1 = __importDefault(require("./Email"));
const Ingredient_1 = __importDefault(require("./Ingredient"));
class Stock {
    // Method to retrieve the stock levels of multiple ingredients
    static getStock(ingredientIds) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construct a SQL query with a WHERE clause to retrieve the stock levels for the specified ingredient IDs
            const placeholders = ingredientIds
                .map((_, index) => `$${index + 1}`)
                .join(", ");
            const query = `SELECT ingredient_id, amount FROM stock WHERE ingredient_id IN (${placeholders})`;
            try {
                // Execute the query with the array of ingredient IDs as parameters
                const result = yield (0, db_1.default)(query, ingredientIds);
                // Process the query result to construct a map of ingredient IDs to stock levels
                const stockMap = new Map();
                result.rows.forEach((row) => {
                    stockMap.set(row.ingredient_id, row.amount);
                });
                return stockMap;
            }
            catch (error) {
                console.error(`Error occurred while fetching stock levels: ${error}`);
                throw error;
            }
        });
    }
    // Method to check if all ingredients required for a product are available in stock
    static areIngredientsAvailable(productIngredients) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Extract the IDs of all ingredients required for the product
                const ingredientIds = yield Ingredient_1.default.ingredientsExtractId(productIngredients); // Await here
                // Retrieve the stock levels for the required ingredients
                const stockMap = yield this.getStock(ingredientIds);
                // Check if each ingredient's required amount is available in stock
                for (const ingredient of productIngredients) {
                    const stockLevel = stockMap.get(ingredient.id) || 0; // Default to 0 if stock level is not found
                    if (Math.ceil(stockLevel) < Math.ceil(ingredient.ingredient_amount)) {
                        // If stock level is less than required amount, return false
                        return false;
                    }
                }
                // If all ingredients are available in sufficient amounts, return true
                return true;
            }
            catch (error) {
                console.error(`Error occurred while checking ingredient availability: ${error}`);
                throw error;
            }
        });
    }
    static updateStock(ingredients) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Construct the SQL query dynamically to update multiple rows in a single query
                const query = `
      UPDATE stock
      SET amount = amount - CASE
        ${ingredients
                    .map((ingredient, index) => `WHEN ingredient_id = $${index * 2 + 1} THEN $${index * 2 + 2}::numeric`)
                    .join(" ")}
        ELSE amount
      END
      WHERE ingredient_id IN (${ingredients
                    .map((_, index) => `$${index * 2 + 1}`)
                    .join(", ")})
    `;
                // Flatten the ingredients array to pass the parameters to the query
                const params = ingredients.flatMap((ingredient) => [
                    ingredient.id,
                    ingredient.ingredient_amount,
                ]);
                // Execute the query
                yield (0, db_1.default)(query, params);
            }
            catch (error) {
                console.error(`Error occurred while updating stock levels: ${error}`);
                throw error;
            }
        });
    }
    static checkStockLevelsAndNotify(ingredients) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ingredientIds = yield Ingredient_1.default.ingredientsExtractId(ingredients);
                // Get low-stock ingredients
                const lowStockIngredients = yield this.getLowStockIngredients(ingredientIds);
                console.log("Low stock ingredients:", lowStockIngredients);
                // Filter low-stock ingredients that haven't been notified yet
                const notNotifiedLowStockIngredients = yield this.filterNotNotified(lowStockIngredients);
                console.log("Not notified low stock ingredients:", notNotifiedLowStockIngredients);
                // Send email for the ingredients that haven't been notified
                if (notNotifiedLowStockIngredients.length > 0) {
                    console.log(`Low stock ingredients: ${notNotifiedLowStockIngredients.join(", ")}`);
                    yield Email_1.default.sendAlertEmails(notNotifiedLowStockIngredients);
                    // Update the is_sent flag for notified ingredients
                    yield Email_1.default.updateIngredientAlertFlags(notNotifiedLowStockIngredients);
                    return true; // Alert sent
                }
                return false; // No need for alert
            }
            catch (error) {
                console.error(`Error occurred while checking stock levels: ${error}`);
                throw error;
            }
        });
    }
    // Method to get total fill amounts for specified ingredient IDs
    static getTotalFillAmounts(ingredientIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const placeholders = ingredientIds
                .map((_, index) => `$${index + 1}`)
                .join(", ");
            const query = `
      SELECT ingredient_id, total_after_fill_amount
      FROM stock_fill_history
      WHERE ingredient_id IN (${placeholders})
    `;
            try {
                const result = yield (0, db_1.default)(query, ingredientIds);
                const fillAmountsMap = new Map();
                result.rows.forEach((row) => {
                    fillAmountsMap.set(row.ingredient_id, row.total_after_fill_amount);
                });
                return fillAmountsMap;
            }
            catch (error) {
                console.error(`Error occurred while fetching total fill amounts: ${error}`);
                throw error;
            }
        });
    }
    // Helper method to get low-stock ingredients
    static getLowStockIngredients(ingredientIds) {
        return __awaiter(this, void 0, void 0, function* () {
            const lowStockIngredients = [];
            // Get current stock levels
            const stockMap = yield this.getStock(ingredientIds);
            // Get total fill amounts from history
            const totalFillAmounts = yield this.getTotalFillAmounts(ingredientIds);
            // Check if stock levels are below 50% of total fill amounts
            for (const ingredientId of ingredientIds) {
                const currentAmount = stockMap.get(ingredientId) || 0;
                const totalFillAmount = totalFillAmounts.get(ingredientId) || 0;
                const ratio = currentAmount / totalFillAmount;
                if (ratio < 0.5) {
                    lowStockIngredients.push(ingredientId);
                }
            }
            return lowStockIngredients;
        });
    }
    // Helper method to filter low-stock ingredients that haven't been notified yet
    static filterNotNotified(lowStockIngredients) {
        return __awaiter(this, void 0, void 0, function* () {
            const notNotifiedLowStockIngredients = [];
            for (const ingredientId of lowStockIngredients) {
                const isSent = yield Email_1.default.getIngredientAlertFlag(ingredientId);
                console.log(`Ingredient ${ingredientId} isSent: ${isSent}`);
                if (!isSent) {
                    notNotifiedLowStockIngredients.push(ingredientId);
                }
            }
            return notNotifiedLowStockIngredients;
        });
    }
}
exports.default = Stock;
//# sourceMappingURL=Stock.js.map