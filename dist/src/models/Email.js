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
const nodemailer_1 = __importDefault(require("nodemailer"));
const db_1 = __importDefault(require("../db"));
class Email {
    static sendAlertEmails(ingredientIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Create a nodemailer transporter
                const transporter = nodemailer_1.default.createTransport({
                    // Specify your email service and credentials
                    service: process.env.EMAIL_SERVICE,
                    auth: {
                        user: process.env.EMAIL_USER,
                        pass: process.env.EMAIL_PASSWORD,
                    },
                });
                // Loop through each ingredient ID and send an email
                for (const id of ingredientIds) {
                    // Compose the email message
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: process.env.EMAIL_RECIEVER,
                        subject: "Low Stock Alert",
                        text: `Ingredient ID ${id} is running low in stock.`,
                    };
                    // Send the email
                    yield transporter.sendMail(mailOptions);
                    // Log the email sent
                    console.log(`Email sent for ingredient ID ${id}`);
                }
            }
            catch (error) {
                console.error(`Error occurred while sending alert emails: ${error}`);
                throw error;
            }
        });
    }
    static updateIngredientAlertFlags(ingredientIds) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                for (const ingredientId of ingredientIds) {
                    const existingFlag = yield this.getIngredientAlertFlag(ingredientId);
                    if (existingFlag === null) {
                        // No existing flag, insert a new record with is_sent set to true
                        yield (0, db_1.default)("INSERT INTO ingredient_alert_flag (ingredient_id, is_sent) VALUES ($1, $2)", [ingredientId, true]);
                    }
                    else if (!existingFlag) {
                        // Existing flag is false, update it to true
                        yield (0, db_1.default)("UPDATE ingredient_alert_flag SET is_sent = $1 WHERE ingredient_id = $2", [true, ingredientId]);
                    }
                }
            }
            catch (error) {
                console.error(`Error occurred while updating ingredient alert flags: ${error}`);
                throw error;
            }
        });
    }
    static getIngredientAlertFlag(ingredientId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, db_1.default)("SELECT is_sent FROM ingredient_alert_flag WHERE ingredient_id = $1", [ingredientId]);
                const flag = result.rows.length > 0 ? result.rows[0] : null;
                return flag ? flag.is_sent : null;
            }
            catch (error) {
                console.error(`Error occurred while fetching ingredient alert flag: ${error}`);
                throw error;
            }
        });
    }
}
exports.default = Email;
//# sourceMappingURL=Email.js.map