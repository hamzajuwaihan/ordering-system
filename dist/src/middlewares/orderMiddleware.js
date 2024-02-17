"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderValidationMiddleware = void 0;
function orderValidationMiddleware(req, res, next) {
    const requestBody = req.body;
    if (!requestBody || !Array.isArray(requestBody.products)) {
        return res
            .status(400)
            .json({ error: "Invalid request: products array is missing" });
    }
    for (const product of requestBody.products) {
        if (typeof product.product_id !== "number" ||
            typeof product.quantity !== "number" ||
            product.product_id <= 0 ||
            product.quantity <= 0) {
            return res
                .status(400)
                .json({ error: "Invalid product in request payload" });
        }
    }
    next();
}
exports.orderValidationMiddleware = orderValidationMiddleware;
exports.default = orderValidationMiddleware;
//# sourceMappingURL=orderMiddleware.js.map