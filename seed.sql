-- Seed data for Together For Her
USE together_db;

-- 1. Insert Beneficiaries (including Sunita)
INSERT INTO beneficiaries (user_name, age, contact_number, email, location, social_status, role, status) VALUES 
('Anjali Sharma', 25, '9876543210', 'anjali@example.com', 'Mumbai', 'Lower Income', 'USER', 'APPROVED'),
('Priya Singh', 28, '9876543211', 'priya@example.com', 'Delhi', 'Middle Class', 'USER', 'APPROVED'),
('Sunita', 40, '9999999999', 'sunita@example.com', 'Bangalore', 'Admin', 'ADMIN', 'APPROVED');

-- 2. Insert Volunteers (including Shubham)
INSERT INTO volunteers (name, email, contact_number, status, volunteer_type, experience, availability) VALUES 
('Rahul Verma', 'rahul@example.com', '9876543212', 'APPROVED', 'FULL_TIME', 5, 'Weekdays'),
('Sneha Patil', 'sneha@example.com', '9876543213', 'APPROVED', 'PART_TIME', 2, 'Weekends'),
('Shubham', 'shubham@example.com', '8888888888', 'APPROVED', 'FULL_TIME', 3, 'Always');

-- 3. Insert Products
INSERT INTO product (product_name, description, price, category, stock, availability, image_url) VALUES 
('Sanitary Napkins', 'High-quality organic cotton pads', 120.00, 'Hygiene', 100, 'In Stock', 'https://via.placeholder.com/150'),
('Prenatal Vitamins', 'Monthly supply of essential vitamins', 450.00, 'Health', 50, 'In Stock', 'https://via.placeholder.com/150'),
('Educational Kit', 'Maternal health awareness guide and items', 300.00, 'Education', 30, 'In Stock', 'https://via.placeholder.com/150');

-- 4. Insert Credentials
INSERT INTO user_credentials (username, password, role) VALUES 
('sunita', 'sunita', 'ADMIN'),
('shubham', 'shubham', 'VOLUNTEER'),
('anjali', 'password123', 'USER'),
('rahul', 'password123', 'VOLUNTEER');
