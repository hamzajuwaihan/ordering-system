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
exports.reset = void 0;
const Stock_1 = __importDefault(require("../models/Stock"));
const Email_1 = __importDefault(require("../models/Email"));
// Method to reset the stock levels of all ingredients, this is for testing purposes so you dont have to edit DB manually.
const reset = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield Stock_1.default.resetStock();
    yield Email_1.default.resetIngredientAlertFlags();
    res.status(200).send("Resetting the system");
});
exports.reset = reset;
exports.default = exports.reset;
//# sourceMappingURL=resetController.js.map