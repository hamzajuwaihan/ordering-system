-- insert_data.sql
INSERT INTO ingredients (ingredient_name) VALUES
('Beef'),
('Cheese'),
('Onion'),
('Yogurt'),
('Tomato');

INSERT INTO products (product_name) VALUES
('Burger'),
('Meatballs'),
('Kibbeh');

INSERT INTO products_ingredients (product_id, ingredient_id, ingredient_amount) VALUES
(1, 1, 150.00),
(1, 2, 30.00),
(1, 3, 20.00),
(2, 3, 10.00),
(2, 5, 10.00),
(3, 1, 10.00),
(3, 3, 10.00),
(3, 5, 10.00);

INSERT INTO stock_fill_history (ingredient_id, total_after_fill_amount, fill_date) VALUES
(1, 20000, '2024-02-16 21:50:39.36998+03'),
(2, 5000, '2024-02-16 21:50:39.36998+03'),
(3, 1000, '2024-02-16 21:50:39.36998+03'),
(4, 10000, '2024-02-16 21:50:39.36998+03'),
(5, 10000, '2024-02-16 21:50:39.36998+03');

INSERT INTO stock (ingredient_id, amount, last_fill_operation) VALUES
(1, 20000.00, 1),
(2, 5000.00, 2),
(3, 1000.00, 3),
(4, 10000.00, 4),
(5, 10000.00, 5);

INSERT INTO ingredient_alert_flag (ingredient_id, is_sent) VALUES
(1, false),
(2, false),
(3, false),
(4, false),
(5, false);
