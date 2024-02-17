import { Request, Response, NextFunction } from "express";
import Order from "../models/Order";
import Stock from "../models/Stock";
import Email from "../models/Email";

export const addNewOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.log(req.body);
  const newOrder: Order = new Order(req.body);

  // Wait for the order items to be fully populated
  await newOrder.populateOrderItems();

  const orderItems = newOrder.orderItems;

  let combinedIngredients: { [key: number]: number } = {};

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

  const combinedIngredientsArray = Object.entries(combinedIngredients).map(
    ([id, ingredient_amount]) => ({ id: parseInt(id), ingredient_amount })
  );

  const isAvailable = await Stock.areIngredientsAvailable(
    combinedIngredientsArray
  );

  if (!isAvailable) {
    return res.status(404).send("Ingredients are not available");
  }

  try {
    await Stock.updateStock(combinedIngredientsArray);
    const response = await Order.saveOrder(newOrder.orderItems);
    await Stock.checkStockLevelsAndNotify(combinedIngredientsArray);
    // Sending the order response along with the success status
    res
      .status(201)
      .send({ message: "Order added successfully", order: response });
  } catch (error) {
    console.error(`Error occurred while updating stock: ${error}`);
    return res.status(500).send("Internal Server Error");
  }
};

// Listen for low stock event
Stock.eventEmitter.on("lowStock", async (lowStockIngredients: number[]) => {
  try {
    // Send email notification
    await Email.sendAlertEmails(lowStockIngredients);
    // Update flags or perform any other necessary actions
    await Email.updateIngredientAlertFlags(lowStockIngredients);
  } catch (error) {
    console.error(`Error occurred while handling low stock event: ${error}`);
    // Handle error
  }
});
