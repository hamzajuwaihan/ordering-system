-- create_tables.sql
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  product_name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS ingredients (
  id SERIAL PRIMARY KEY,
  ingredient_name VARCHAR(30)
);

CREATE TABLE IF NOT EXISTS products_ingredients (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  ingredient_id INTEGER,
  ingredient_amount NUMERIC(10, 2),
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY
);

CREATE TABLE IF NOT EXISTS order_products (
  id SERIAL PRIMARY KEY,
  order_id INTEGER,
  product_id INTEGER,
  quantity INTEGER,
  FOREIGN KEY (order_id) REFERENCES orders(id),
  FOREIGN KEY (product_id) REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS stock (
  id SERIAL PRIMARY KEY,
  ingredient_id INTEGER UNIQUE NOT NULL,
  amount NUMERIC(10, 2),
  last_fill_operation INTEGER,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id),
  FOREIGN KEY (last_fill_operation) REFERENCES stock_fill_history(id)
);

CREATE TABLE IF NOT EXISTS stock_fill_history (
  id SERIAL PRIMARY KEY,
  ingredient_id INTEGER,
  total_after_fill_amount NUMERIC(10, 2),
  fill_date TIMESTAMP,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);

CREATE TABLE IF NOT EXISTS ingredient_alert_flag (
  id SERIAL PRIMARY KEY,
  ingredient_id INTEGER UNIQUE NOT NULL,
  is_sent BOOLEAN,
  FOREIGN KEY (ingredient_id) REFERENCES ingredients(id)
);
