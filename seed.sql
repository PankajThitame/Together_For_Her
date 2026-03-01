-- Seed data for Together For Her
USE together_db;

-- 1. Insert Beneficiaries
INSERT INTO beneficiaries (user_name, age, contact_number, email, location, social_status, role, status) VALUES 
('Anjali Sharma', 25, '9876543210', 'anjali@example.com', 'Mumbai', 'Lower Income', 'USER', 'APPROVED'),
('Priya Singh', 28, '9876543211', 'priya@example.com', 'Delhi', 'Middle Class', 'USER', 'APPROVED');

-- 2. Insert Volunteers
INSERT INTO volunteers (name, email, contact_number, status, volunteer_type, experience, availability) VALUES 
('Rahul Verma', 'rahul@example.com', '9876543212', 'APPROVED', 'FULL_TIME', 5, 'Weekdays'),
('Sneha Patil', 'sneha@example.com', '9876543213', 'APPROVED', 'PART_TIME', 2, 'Weekends');

-- 3. Insert Products
INSERT INTO product (product_name, description, price, category, stock, availability, image_url) VALUES 
('Sanitary Napkins', 'High-quality organic cotton pads', 120.00, 'Hygiene', 100, 'In Stock', 'https://via.placeholder.com/150'),
('Prenatal Vitamins', 'Monthly supply of essential vitamins', 450.00, 'Health', 50, 'In Stock', 'https://via.placeholder.com/150'),
('Educational Kit', 'Maternal health awareness guide and items', 300.00, 'Education', 30, 'In Stock', 'https://via.placeholder.com/150');

-- 4. Insert Credentials (Password is 'password123' for simplicity in testing)
-- Note: In a real app, these would be hashed.
INSERT INTO user_credentials (username, password, role) VALUES 
('admin', 'admin123', 'ADMIN'),
('anjali', 'password123', 'USER'),
('rahul', 'password123', 'VOLUNTEER');
