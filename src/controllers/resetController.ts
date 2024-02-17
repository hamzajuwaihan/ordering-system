import { Request, Response, NextFunction } from "express";
import Stock from "../models/Stock";

// Method to reset the stock levels of all ingredients, this is for testing purposes so you dont have to edit DB manually.
export const reset = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  Stock.resetStock();

  res.status(200).send("Resetting the system");
};

export default reset;
