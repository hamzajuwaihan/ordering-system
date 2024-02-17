jest.mock("../src/db", () => ({ executeQuery: jest.fn() }));

import Stock from "../src/models/Stock";

describe("Stock Model", () => {
  describe("updateStock", () => {
    it("should update stock levels for multiple ingredients", async () => {
      const ingredients = [
        { id: 1, ingredient_amount: 5 },
        { id: 2, ingredient_amount: 3 },
      ];

      // Provide a value to mockResolvedValue (e.g., an empty array):
      const mockExecuteQuery = jest.fn().mockResolvedValue([]);
      jest.spyOn(Stock, "updateStock").mockImplementation(mockExecuteQuery);

      await Stock.updateStock(ingredients);

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

      expect(mockExecuteQuery).toHaveBeenCalledWith(
        expect.stringContaining(expectedQuery),
        expect.arrayContaining(expectedParams)
      );
    });
  });
});
