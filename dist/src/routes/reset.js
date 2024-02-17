"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resetController_1 = __importDefault(require("../controllers/resetController"));
const router = express_1.default.Router();
router.post("/", resetController_1.default);
exports.default = router;
//# sourceMappingURL=reset.js.map