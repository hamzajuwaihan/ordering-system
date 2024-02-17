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
const Product_1 = __importDefault(require("./Product"));
const db_1 = __importDefault(require("../db"));
class Order {
    constructor(data) {
        this.orderItems = data.products.map((item) => ({
            product_id: item.product_id,
            quantity: item.quantity,
            product: null,
        }));
    }
    populateOrderItems() {
        return __awaiter(this, void 0, void 0, function* () {
            const promises = this.orderItems.map((item) => __awaiter(this, void 0, void 0, function* () {
                item.product = yield Product_1.default.getById(item.product_id);
            }));
            yield Promise.all(promises);
        });
    }
    static saveOrder(order) {
        return __awaiter(this, void 0, void 0, function* () {
            let client = db_1.default;
            let orderId;
            try {
                yield client("BEGIN");
                // Step 1: Insert a new record into the orders table to get the generated order ID
                const resultId = yield client("INSERT INTO orders DEFAULT VALUES RETURNING id");
                orderId = resultId.rows[0].id;
                // Commit the transaction after successfully inserting the order
                yield client("COMMIT");
                // Step 2: Insert order items into the order_products table with the generated order ID
                const promises = order.map((orderItem) => __awaiter(this, void 0, void 0, function* () {
                    const { product_id, quantity } = orderItem;
                    yield client("INSERT INTO order_products (order_id, product_id, quantity) VALUES ($1, $2, $3)", [orderId, product_id, quantity]);
                }));
                yield Promise.all(promises);
                // Fetch the inserted order items associated with the order ID
                const orderItemsResult = yield client("SELECT id, product_id, quantity FROM order_products WHERE order_id = $1", [orderId]);
                const orderItems = orderItemsResult.rows;
                // Construct the order record with order ID and order items
                const orderRecord = {
                    id: orderId,
                    order_items: orderItems.map((item) => ({
                        product_id: item.product_id,
                        quantity: item.quantity,
                    })),
                };
                return orderRecord;
            }
            catch (error) {
                // Rollback the transaction if an error occurs
                yield client("ROLLBACK");
                console.error(`Error occurred while saving order: ${error}`);
                throw error;
            }
        });
    }
}
exports.default = Order;
//# sourceMappingURL=Order.js.map