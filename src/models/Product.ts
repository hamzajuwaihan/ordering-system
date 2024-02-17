import executeQuery from "../db";

interface Ingredient {
  id: number;
  ingredient_name: string;
  ingredient_amount: number;
}

interface ProductData {
  id: number;
  product_name: string;
  ingredients?: Ingredient[]; // Ensure ingredients property is optional
}

class Product {
  readonly id: number;
  product_name: string;
  ingredients: Ingredient[]; // Ensure ingredients property is always initialized

  constructor(data: ProductData) {
    this.id = data.id;
    this.product_name = data.product_name;
    this.ingredients = data.ingredients || []; // Initialize ingredients property
  }

  static async getById(id: number): Promise<Product | null> {
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
      const result = await executeQuery(query, [id]);
      if (result.rows.length === 0) {
        return null;
      }

      const productData: ProductData = {
        id: result.rows[0].id,
        product_name: result.rows[0].product_name,
        ingredients: [], // Initialize ingredients array
      };

      result.rows.forEach((row) => {
        const { ingredient_id, ingredient_name, ingredient_amount } = row;
        productData.ingredients!.push({
          // Ensure ingredients property is not null or undefined
          id: ingredient_id,
          ingredient_name,
          ingredient_amount,
        });
      });

      return new Product(productData);
    } catch (err) {
      console.error(`Error occurred while fetching product by ID: ${err}`);
      throw err;
    }
  }
}

export default Product;
