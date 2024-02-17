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
const db_1 = __importDefault(require("../db"));
class Product {
    constructor(data) {
        this.id = data.id;
        this.product_name = data.product_name;
        this.ingredients = data.ingredients || []; // Initialize ingredients property
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
      SELECT products.id, products.product_name,
             ingredients.id AS ingredient_id, ingredients.ingredient_name,
             products_ingredients.ingredient_amount
      FROM products
      INNER JOIN products_ingredients ON products.id = products_ingredients.product_id
      INNER JOIN ingredients ON products_ingredients.ingredient_id = ingredients.id
      WHERE products.id = $1
    `;
            try {
                const result = yield (0, db_1.default)(query, [id]);
                if (result.rows.length === 0) {
                    return null;
                }
                const productData = {
                    id: result.rows[0].id,
                    product_name: result.rows[0].product_name,
                    ingredients: [], // Initialize ingredients array
                };
                result.rows.forEach((row) => {
                    const { ingredient_id, ingredient_name, ingredient_amount } = row;
                    productData.ingredients.push({
                        // Ensure ingredients property is not null or undefined
                        id: ingredient_id,
                        ingredient_name,
                        ingredient_amount,
                    });
                });
                return new Product(productData);
            }
            catch (err) {
                console.error(`Error occurred while fetching product by ID: ${err}`);
                throw err;
            }
        });
    }
}
exports.default = Product;
//# sourceMappingURL=Product.js.map