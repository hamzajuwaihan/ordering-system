import Product from "./Product";
import executeQuery, { QueryFunction } from "../db";

interface OrderItemData {
  product_id: number;
  quantity: number;
}

interface OrderData {
  products: OrderItemData[];
}

interface OrderRecord {
  id: number;
  order_items: {
    product_id: number;
    quantity: number;
  }[];
}

class Order {
  orderItems: OrderItem[];

  constructor(data: OrderData) {
    this.orderItems = data.products.map((item) => ({
      product_id: item.product_id,
      quantity: item.quantity,
      product: null,
    }));
  }

  async populateOrderItems(): Promise<void> {
    const promises = this.orderItems.map(async (item) => {
      item.product = await Product.getById(item.product_id);
    });

    await Promise.all(promises);
  }

  static async saveOrder(order: OrderItemData[]): Promise<OrderRecord> {
    let client: QueryFunction = executeQuery;
    let orderId: number;

    try {
      await client("BEGIN");

      // Step 1: Insert a new record into the orders table to get the generated order ID
      const resultId = await client(
        "INSERT INTO orders DEFAULT VALUES RETURNING id"
      );
      orderId = resultId.rows[0].id;

      // Commit the transaction after successfully inserting the order
      await client("COMMIT");

      // Step 2: Insert order items into the order_products table with the generated order ID
      const promises = order.map(async (orderItem) => {
        const { product_id, quantity } = orderItem;
        await client(
          "INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)",
          [orderId, product_id, quantity]
        );
      });
      await Promise.all(promises);

      // Fetch the inserted order items associated with the order ID
      const orderItemsResult = await client(
        "SELECT id, product_id, quantity FROM order_products WHERE order_id = $1",
        [orderId]
      );
      const orderItems: OrderRecord["order_items"] = orderItemsResult.rows;

      // Construct the order record with order ID and order items
      const orderRecord: OrderRecord = {
        id: orderId,
        order_items: orderItems.map((item) => ({
          product_id: item.product_id,
          quantity: item.quantity,
        })),
      };

      return orderRecord;
    } catch (error) {
      // Rollback the transaction if an error occurs
      await client("ROLLBACK");
      console.error(`Error occurred while saving order: ${error}`);
      throw error;
    }
  }
}

interface OrderItem {
  product_id: number;
  quantity: number;
  product: Product | null;
}

export default Order;
