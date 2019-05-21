ALTER USER 'root'@'localhost' IDENTIFIED
WITH mysql_native_password BY 'Password01';
DROP DATABASE IF EXISTS bamazon_db;
CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products
(
    id_item INT NOT NULL
    AUTO_INCREMENT,
product_name VARCHAR
    (100),
department_name VARCHAR
    (100), 
price DECIMAL
    (10,2),
stock_quantity INT NULL,
PRIMARY KEY
    (id_item)
);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Get Programming", "Books", 40.00, 5);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Javascript&Jquery", "Books", 35.00, 12);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Eloquent Javascript", "Books", 45.00, 30);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Sharpie Permanent Marker", "Office Supplies", 3.50, 50);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Expo Dry Erase Marker", "Office Supplies", 2.00, 99);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Pilot G-2 07 Pen", "Office Supplies", 1.00, 87);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Alpo 8 ounce can", "Pet Food", 0.89, 101);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Purina Pro Plan Dry Dog Food", "Pet Food", 33.25, 56);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Pedigree Food for Dogs", "Pet Food", 22.87, 124);

    INSERT INTO products
        (product_name, department_name, price, stock_quantity)
    VALUES
        ("Science Diet Indoor Cat Food", "Pet Food", 26.56, 21);



    SELECT *
    FROM products;