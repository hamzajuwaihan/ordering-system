import { Request, Response, NextFunction } from "express";

interface Product {
  product_id: number;
  quantity: number;
}

interface OrderRequest {
  products: Product[];
}

export function orderValidationMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const requestBody: OrderRequest = req.body;

  if (!requestBody || !Array.isArray(requestBody.products)) {
    return res
      .status(400)
      .json({ error: "Invalid request: products array is missing" });
  }

  for (const product of requestBody.products) {
    if (
      typeof product.product_id !== "number" ||
      typeof product.quantity !== "number" ||
      product.product_id <= 0 ||
      product.quantity <= 0
    ) {
      return res
        .status(400)
        .json({ error: "Invalid product in request payload" });
    }
  }

  next();
}

export default orderValidationMiddleware;