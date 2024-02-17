import executeQuery from "../db";

interface IngredientData {
  id: number;
}

class Ingredient {
  id: number;

  constructor(data: IngredientData) {
    this.id = data.id;
  }

  static async getById(id: number): Promise<Ingredient | null> {
    const query = "SELECT id FROM ingredients WHERE id = $1";
    const result = await executeQuery(query, [id]);
    if (result.rows.length === 0) {
      return null;
    }
    return new Ingredient({ id: result.rows[0].id });
  }
  static async ingredientsExtractId(
    ingredients: { id: number; ingredient_amount: number }[]
  ): Promise<number[]> {
    // Extract the IDs of all ingredients required for the product
    const ingredientIds = ingredients.map((ingredient) => ingredient.id);
    return ingredientIds;
  }
}

export default Ingredient;
