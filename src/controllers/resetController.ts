import { Request, Response, NextFunction } from "express";
import Stock from "../models/Stock";
import Email from "../models/Email";

// Method to reset the stock levels of all ingredients, this is for testing purposes so you dont have to edit DB manually.
export const reset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  await Stock.resetStock();
  await Email.resetIngredientAlertFlags();
  res.status(200).send("Resetting the system");
};

export default reset;
