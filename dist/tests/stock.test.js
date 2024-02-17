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
jest.mock("../src/db", () => ({ executeQuery: jest.fn() }));
const Stock_1 = __importDefault(require("../src/models/Stock"));
describe("Stock Model", () => {
    describe("updateStock", () => {
        it("should update stock levels for multiple ingredients", () => __awaiter(void 0, void 0, void 0, function* () {
            const ingredients = [
                { id: 1, ingredient_amount: 5 },
                { id: 2, ingredient_amount: 3 },
            ];
            // Provide a value to mockResolvedValue (e.g., an empty array):
            const mockExecuteQuery = jest.fn().mockResolvedValue([]);
            jest.spyOn(Stock_1.default, "updateStock").mockImplementation(mockExecuteQuery);
            yield Stock_1.default.updateStock(ingredients);
            const expectedQuery = `
        UPDATE stock
        SET amount = amount - CASE
          WHEN ingredient_id = 1 THEN 5::numeric
          WHEN ingredient_id = 2 THEN 3::numeric
          ELSE amount
        END
        WHERE ingredient_id IN (1, 2)
      `;
            const expectedParams = [1, 5, 2, 3];
            expect(mockExecuteQuery).toHaveBeenCalledWith(expect.stringContaining(expectedQuery), expect.arrayContaining(expectedParams));
        }));
    });
});
//# sourceMappingURL=stock.test.js.map