import nodemailer from "nodemailer";
import executeQuery from "../db";

class Email {
  static async sendAlertEmails(ingredientIds: number[]): Promise<void> {
    try {
      // Create a nodemailer transporter
      const transporter = nodemailer.createTransport({
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
        await transporter.sendMail(mailOptions);

        // Log the email sent
        console.log(`Email sent for ingredient ID ${id}`);
      }
    } catch (error) {
      console.error(`Error occurred while sending alert emails: ${error}`);
      throw error;
    }
  }

  static async updateIngredientAlertFlags(
    ingredientIds: number[]
  ): Promise<void> {
    try {
      for (const ingredientId of ingredientIds) {
        const existingFlag = await this.getIngredientAlertFlag(ingredientId);

        if (existingFlag === null) {
          // No existing flag, insert a new record with is_sent set to true
          await executeQuery(
            "INSERT INTO ingredient_alert_flag (ingredient_id, is_sent) VALUES ($1, $2)",
            [ingredientId, true]
          );
        } else if (!existingFlag) {
          // Existing flag is false, update it to true
          await executeQuery(
            "UPDATE ingredient_alert_flag SET is_sent = $1 WHERE ingredient_id = $2",
            [true, ingredientId]
          );
        }
      }
    } catch (error) {
      console.error(
        `Error occurred while updating ingredient alert flags: ${error}`
      );
      throw error;
    }
  }

  static async getIngredientAlertFlag(
    ingredientId: number
  ): Promise<boolean | null> {
    try {
      const result = await executeQuery(
        "SELECT is_sent FROM ingredient_alert_flag WHERE ingredient_id = $1",
        [ingredientId]
      );
      const flag = result.rows.length > 0 ? result.rows[0] : null;
      return flag ? flag.is_sent : null;
    } catch (error) {
      console.error(
        `Error occurred while fetching ingredient alert flag: ${error}`
      );
      throw error;
    }
  }
}

export default Email;
