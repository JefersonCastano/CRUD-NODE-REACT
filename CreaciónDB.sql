-- Creación de Tablas
CREATE TABLE categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,
    category_name VARCHAR(255) NOT NULL,
    category_description VARCHAR(500) NOT NULL
);

CREATE TABLE brands (
    brand_id INT AUTO_INCREMENT PRIMARY KEY,
    brand_name VARCHAR(255) NOT NULL,
    brand_home_country VARCHAR(255) NOT NULL,
    brand_provider VARCHAR(255) NOT NULL
);

CREATE TABLE products (
    product_id INT AUTO_INCREMENT PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    brand_id INT NOT NULL,
    category_id INT NOT NULL,
    model_year SMALLINT NOT NULL,
    list_price DECIMAL(10, 2) NOT NULL,
    FOREIGN KEY (category_id) REFERENCES categories(category_id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (brand_id) REFERENCES brands(brand_id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- INSERT de datos de prueba
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(1, 'Electra', 'USA', 'Electra Bicycle Company');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(2, 'Haro', 'Italy', 'Haro Bikes');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(3, 'Heller', 'USA', 'Heller Bikes');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(4, 'Pure Cycles', 'USA', 'Pure Cycles Bikes');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(5, 'Ritchey', 'Korea', 'Ritchey Bicycle Company');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(6, 'Strider', 'USA', 'Strider Bikes');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(7, 'Sun Bicycles', 'China', 'Sun Bicycles Company');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(8, 'Surly', 'USA', 'Surly Bikes');
INSERT INTO brands(brand_id, brand_name, brand_home_country, brand_provider) VALUES(9, 'Trek', 'Germany', 'Trek Bicycle Corporation');

INSERT INTO categories(category_id, category_name, category_description) VALUES(1, 'Children Bicycles', 'Bicycles designed for children');
INSERT INTO categories(category_id, category_name, category_description) VALUES(2, 'Comfort Bicycles', 'Bicycles designed for comfortable rides');
INSERT INTO categories(category_id, category_name, category_description) VALUES(3, 'Cruisers Bicycles', 'Bicycles designed for leisurely rides');
INSERT INTO categories(category_id, category_name, category_description) VALUES(4, 'Cyclocross Bicycles', 'Bicycles designed for cyclocross racing');
INSERT INTO categories(category_id, category_name, category_description) VALUES(5, 'Electric Bikes', 'Bicycles with electric motor assistance');
INSERT INTO categories(category_id, category_name, category_description) VALUES(6, 'Mountain Bikes', 'Bicycles designed for off-road trails');
INSERT INTO categories(category_id, category_name, category_description) VALUES(7, 'Road Bikes', 'Bicycles designed for paved roads');