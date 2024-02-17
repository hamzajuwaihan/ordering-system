"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/order.ts
const express_1 = __importDefault(require("express"));
const orderController_1 = require("../controllers/orderController");
const orderMiddleware_1 = __importDefault(require("../middlewares/orderMiddleware"));
const router = express_1.default.Router();
router.post("/", orderMiddleware_1.default, orderController_1.addNewOrder);
exports.default = router;
//# sourceMappingURL=order.js.map