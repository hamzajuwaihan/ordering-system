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
class Ingredient {
    constructor(data) {
        this.id = data.id;
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT id FROM ingredients WHERE id = $1";
            const result = yield (0, db_1.default)(query, [id]);
            if (result.rows.length === 0) {
                return null;
            }
            return new Ingredient({ id: result.rows[0].id });
        });
    }
    static ingredientsExtractId(ingredients) {
        return __awaiter(this, void 0, void 0, function* () {
            // Extract the IDs of all ingredients required for the product
            const ingredientIds = ingredients.map((ingredient) => ingredient.id);
            return ingredientIds;
        });
    }
}
exports.default = Ingredient;
//# sourceMappingURL=Ingredient.js.map