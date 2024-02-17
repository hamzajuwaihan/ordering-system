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
exports.addNewOrder = void 0;
const Order_1 = __importDefault(require("../models/Order"));
const Stock_1 = __importDefault(require("../models/Stock"));
const addNewOrder = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    const newOrder = new Order_1.default(req.body);
    // Wait for the order items to be fully populated
    yield newOrder.populateOrderItems();
    const orderItems = newOrder.orderItems;
    let combinedIngredients = {};
    for (const orderItem of orderItems) {
        const product = orderItem.product;
        if (!product) {
            return res.status(400).send("Invalid product ID");
        }
        const ingredients = product.ingredients;
        ingredients.forEach((ingredient) => {
            combinedIngredients[ingredient.id] =
                (combinedIngredients[ingredient.id] || 0) +
                    ingredient.ingredient_amount * orderItem.quantity;
        });
    }
    const combinedIngredientsArray = Object.entries(combinedIngredients).map(([id, ingredient_amount]) => ({ id: parseInt(id), ingredient_amount }));
    const isAvailable = yield Stock_1.default.areIngredientsAvailable(combinedIngredientsArray);
    if (!isAvailable) {
        return res.status(404).send("Ingredients are not available");
    }
    try {
        yield Stock_1.default.updateStock(combinedIngredientsArray);
        const response = yield Order_1.default.saveOrder(newOrder.orderItems);
        yield Stock_1.default.checkStockLevelsAndNotify(combinedIngredientsArray);
        // Sending the order response along with the success status
        res
            .status(201)
            .send({ message: "Order added successfully", order: response });
    }
    catch (error) {
        console.error(`Error occurred while updating stock: ${error}`);
        return res.status(500).send("Internal Server Error");
    }
});
exports.addNewOrder = addNewOrder;
//# sourceMappingURL=orderController.js.map