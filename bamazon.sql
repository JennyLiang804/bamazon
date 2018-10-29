DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NOT NULL,
    department_name VARCHAR(45) NOT NULL,
    price DECIMAL(8,2) NOT NULL default 0,
    stock_quantity INT NOT NULL default 0,
    PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Unicorn", "Animals", 777.77, 99);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-waffles", "Food", 3.25, 1000);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Russian Mule", "Alcoholic Beverage", 12.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-i8", "Car", 147500.00, 5);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Sono", "Electronic", 500.00, 75);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Joshual Tree", "Plants", 4540.79, 25);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Siberian Forest Cat", "Animals", 2000.00, 1);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Branzino", "Food", 28.00, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Sapphire Martini", "Alcoholic Beverage", 18.99, 50);

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("-Monstera Plant", "Plants", 75.99, 75);






