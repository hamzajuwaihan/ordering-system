import EventEmitter from "events";
import executeQuery from "../db";
import Email from "./Email";
import Ingredient from "./Ingredient";
interface StockData {
  ingredient_id: number;
  amount: number;
}

export interface IngredientUpdate {
  id: number;
  ingredient_amount: number;
}

interface StockFillHistoryData {
  ingredient_id: number;
  total_after_fill_amount: number;
}

class Stock {
  static eventEmitter = new EventEmitter();

  // Method to retrieve the stock levels of multiple ingredients
  static async getStock(ingredientIds: number[]): Promise<Map<number, number>> {
    // Construct a SQL query with a WHERE clause to retrieve the stock levels for the specified ingredient IDs
    const placeholders = ingredientIds
      .map((_, index) => `$${index + 1}`)
      .join(", ");
    const query = `SELECT ingredient_id, amount FROM stock WHERE ingredient_id IN (${placeholders})`;

    try {
      // Execute the query with the array of ingredient IDs as parameters
      const result = await executeQuery(query, ingredientIds);

      // Process the query result to construct a map of ingredient IDs to stock levels
      const stockMap = new Map<number, number>();
      result.rows.forEach((row: StockData) => {
        stockMap.set(row.ingredient_id, row.amount);
      });
      return stockMap;
    } catch (error) {
      console.error(`Error occurred while fetching stock levels: ${error}`);
      throw error;
    }
  }

  // Method to check if all ingredients required for a product are available in stock
  static async areIngredientsAvailable(
    productIngredients: { id: number; ingredient_amount: number }[]
  ): Promise<boolean> {
    try {
      // Extract the IDs of all ingredients required for the product
      const ingredientIds = await Ingredient.ingredientsExtractId(
        productIngredients
      ); // Await here

      // Retrieve the stock levels for the required ingredients
      const stockMap = await this.getStock(ingredientIds);

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
    } catch (error) {
      console.error(
        `Error occurred while checking ingredient availability: ${error}`
      );
      throw error;
    }
  }

  static async updateStock(ingredients: IngredientUpdate[]): Promise<void> {
    try {
      // Construct the SQL query dynamically to update multiple rows in a single query
      const query = `
      UPDATE stock
      SET amount = amount - CASE
        ${ingredients
          .map(
            (ingredient, index) =>
              `WHEN ingredient_id = $${index * 2 + 1} THEN $${
                index * 2 + 2
              }::numeric`
          )
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
      await executeQuery(query, params);
    } catch (error) {
      console.error(`Error occurred while updating stock levels: ${error}`);
      throw error;
    }
  }

  static async checkStockLevelsAndNotify(
    ingredients: { id: number; ingredient_amount: number }[]
  ): Promise<boolean> {
    try {
      const ingredientIds = await Ingredient.ingredientsExtractId(ingredients);

      // Get low-stock ingredients
      const lowStockIngredients = await this.getLowStockIngredients(
        ingredientIds
      );

      
      // Filter low-stock ingredients that haven't been notified yet
      const notNotifiedLowStockIngredients = await this.filterNotNotified(
        lowStockIngredients
      );
      console.log(
        "Not notified low stock ingredients:",
        notNotifiedLowStockIngredients
      );
      // Send email for the ingredients that haven't been notified
      if (notNotifiedLowStockIngredients.length > 0) {
        console.log(
          `Low stock ingredients: ${notNotifiedLowStockIngredients.join(", ")}`
        );
        
        this.eventEmitter.emit('lowStock', lowStockIngredients);

        // await Email.sendAlertEmails(notNotifiedLowStockIngredients);

        // // Update the is_sent flag for notified ingredients
        // await Email.updateIngredientAlertFlags(notNotifiedLowStockIngredients);

        return true; // Alert sent
      }

      return false; // No need for alert
    } catch (error) {
      console.error(`Error occurred while checking stock levels: ${error}`);
      throw error;
    }
  }

  // Method to get total fill amounts for specified ingredient IDs
  static async getTotalFillAmounts(
    ingredientIds: number[]
  ): Promise<Map<number, number>> {
    const placeholders = ingredientIds
      .map((_, index) => `$${index + 1}`)
      .join(", ");

    const query = `
      SELECT ingredient_id, total_after_fill_amount
      FROM stock_fill_history
      WHERE ingredient_id IN (${placeholders})
    `;

    try {
      const result = await executeQuery(query, ingredientIds);

      const fillAmountsMap = new Map<number, number>();
      result.rows.forEach((row: StockFillHistoryData) => {
        fillAmountsMap.set(row.ingredient_id, row.total_after_fill_amount);
      });

      return fillAmountsMap;
    } catch (error) {
      console.error(
        `Error occurred while fetching total fill amounts: ${error}`
      );
      throw error;
    }
  }

  // Helper method to get low-stock ingredients
  private static async getLowStockIngredients(
    ingredientIds: number[]
  ): Promise<number[]> {
    const lowStockIngredients: number[] = [];

    // Get current stock levels
    const stockMap = await this.getStock(ingredientIds);

    // Get total fill amounts from history
    const totalFillAmounts = await this.getTotalFillAmounts(ingredientIds);

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
  }

  // Helper method to filter low-stock ingredients that haven't been notified yet
  private static async filterNotNotified(
    lowStockIngredients: number[]
  ): Promise<number[]> {
    const notNotifiedLowStockIngredients: number[] = [];

    for (const ingredientId of lowStockIngredients) {
      const isSent = await Email.getIngredientAlertFlag(ingredientId);
      console.log(`Ingredient ${ingredientId} isSent: ${isSent}`);
      if (!isSent) {
        notNotifiedLowStockIngredients.push(ingredientId);
      }
    }

    return notNotifiedLowStockIngredients;
  }

  // Method to reset the stock levels of all ingredients

  static async resetStock(): Promise<void> {
    const query = "UPDATE stock SET amount = 10000.00";

    try {
      await executeQuery(query);
    } catch (error) {
      console.error(`Error occurred while resetting stock levels: ${error}`);
      throw error;
    }
  }
}


export default Stock;
