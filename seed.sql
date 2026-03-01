-- Reset and Seed data for Together For Her
USE together_db;

-- Clear existing data
SET FOREIGN_KEY_CHECKS = 0;
TRUNCATE TABLE feedback;
TRUNCATE TABLE community_messages;
TRUNCATE TABLE user_credentials;
TRUNCATE TABLE beneficiaries;
TRUNCATE TABLE volunteers;
TRUNCATE TABLE product;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. Insert Beneficiaries (User Table)
INSERT INTO beneficiaries (id, user_name, age, contact_number, email, location, social_status, role, status, preferred_language, health_concerns, verification_status) VALUES 
(1, 'Anjali Sharma', 25, '9876543210', 'anjali@example.com', 'Mumbai', 'Lower Income', 'USER', 'APPROVED', 'Hindi', 'None', 'VERIFIED'),
(2, 'Priya Singh', 28, '9876543211', 'priya@example.com', 'Delhi', 'Middle Class', 'USER', 'APPROVED', 'English', 'None', 'VERIFIED'),
(3, 'Sunita Kapoor', 40, '9999999999', 'sunita@example.com', 'Bangalore', 'Admin', 'ADMIN', 'APPROVED', 'Kannada', 'None', 'VERIFIED'),
(4, 'Meera Bai', 32, '9876543214', 'meera@example.com', 'Pune', 'Lower Income', 'USER', 'APPROVED', 'Marathi', 'Anemia', 'VERIFIED'),
(5, 'Kavita Devi', 29, '9876543215', 'kavita@example.com', 'Jaipur', 'Lower Income', 'USER', 'APPROVED', 'Hindi', 'None', 'VERIFIED'),
(6, 'Rani Mukherji', 24, '9876543216', 'rani@example.com', 'Kolkata', 'Middle Class', 'USER', 'APPROVED', 'Bengali', 'None', 'VERIFIED'),
(7, 'Sita Ram', 35, '9876543217', 'sita@example.com', 'Lucknow', 'Lower Income', 'USER', 'APPROVED', 'Hindi', 'Nutritional', 'VERIFIED'),
(8, 'Geeta Phogat', 27, '9876543218', 'geeta@example.com', 'Haryana', 'Middle Class', 'USER', 'APPROVED', 'Hindi', 'None', 'VERIFIED'),
(9, 'Lata Mangeshkar', 45, '9876543219', 'lata@example.com', 'Indore', 'Middle Class', 'USER', 'APPROVED', 'Hindi', 'None', 'VERIFIED'),
(10, 'Asha Bhosle', 42, '9876543220', 'asha@example.com', 'Mumbai', 'Lower Income', 'USER', 'APPROVED', 'Marathi', 'None', 'VERIFIED');

-- 2. Insert Volunteers
INSERT INTO volunteers (id, name, email, contact_number, status, volunteer_type, experience, availability) VALUES 
(1, 'Rahul Verma', 'rahul@example.com', '9876543212', 'APPROVED', 'FULL_TIME', 5, 'Weekdays'),
(2, 'Sneha Patil', 'sneha@example.com', '9876543213', 'APPROVED', 'PART_TIME', 2, 'Weekends'),
(3, 'Shubham Kumar', 'shubham@example.com', '8888888888', 'APPROVED', 'FULL_TIME', 3, 'Always'),
(4, 'Amit Shah', 'amit@example.com', '8888888889', 'APPROVED', 'PART_TIME', 4, 'Weekends'),
(5, 'Deepa Malik', 'deepa@example.com', '8888888890', 'APPROVED', 'FULL_TIME', 6, 'Weekdays'),
(6, 'Vikram Seth', 'vikram@example.com', '8888888891', 'APPROVED', 'FULL_TIME', 1, 'Always'),
(7, 'Pooja Hegde', 'pooja@example.com', '8888888892', 'APPROVED', 'PART_TIME', 3, 'Evening'),
(8, 'Suresh Raina', 'suresh@example.com', '8888888893', 'APPROVED', 'FULL_TIME', 2, 'Morning'),
(9, 'Mithali Raj', 'mithali@example.com', '8888888894', 'APPROVED', 'PART_TIME', 5, 'Weekends'),
(10, 'Neeraj Chopra', 'neeraj@example.com', '8888888895', 'APPROVED', 'FULL_TIME', 3, 'Always');

-- 3. Insert Credentials (ONE credential per user/volunteer to avoid UNIQUE constraint violations)
-- Using SHORT NAMES as the primary username for ease of login
INSERT INTO user_credentials (username, password, role, user_id, volunteer_id) VALUES 
('sunita', 'together123', 'ADMIN', 3, NULL),
('shubham', 'together123', 'VOLUNTEER', NULL, 3),
('anjali', 'together123', 'USER', 1, NULL),
('priya', 'together123', 'USER', 2, NULL),
('meera', 'together123', 'USER', 4, NULL),
('kavita', 'together123', 'USER', 5, NULL),
('rani', 'together123', 'USER', 6, NULL),
('sita', 'together123', 'USER', 7, NULL),
('geeta', 'together123', 'USER', 8, NULL),
('lata', 'together123', 'USER', 9, NULL),
('asha', 'together123', 'USER', 10, NULL),
('rahul', 'together123', 'VOLUNTEER', NULL, 1),
('sneha', 'together123', 'VOLUNTEER', NULL, 2),
('amit', 'together123', 'VOLUNTEER', NULL, 4),
('deepa', 'together123', 'VOLUNTEER', NULL, 5),
('vikram', 'together123', 'VOLUNTEER', NULL, 6),
('pooja', 'together123', 'VOLUNTEER', NULL, 7),
('suresh', 'together123', 'VOLUNTEER', NULL, 8),
('mithali', 'together123', 'VOLUNTEER', NULL, 9),
('neeraj', 'together123', 'VOLUNTEER', NULL, 10);

-- 4. Insert Products
INSERT INTO product (product_name, description, price, category, stock, availability, image_url) VALUES 
('Organic Sanitary Pads', 'Ultra-soft organic cotton pads, pack of 12', 150.00, 'Hygiene', 100, 'In Stock', 'https://via.placeholder.com/150'),
('Menstrual Cup', 'Eco-friendly medical grade silicone cup', 450.00, 'Hygiene', 50, 'In Stock', 'https://via.placeholder.com/150'),
('Prenatal Multivitamins', 'Essential vitamins for expectant mothers', 350.00, 'Health', 80, 'In Stock', 'https://via.placeholder.com/150'),
('Iron Supplements', 'High absorption iron for anemia prevention', 200.00, 'Health', 120, 'In Stock', 'https://via.placeholder.com/150'),
('Maternal Health Guide', 'Comprehensive book on wellness and nutrition', 100.00, 'Education', 200, 'In Stock', 'https://via.placeholder.com/150'),
('Hygiene Awareness Kit', 'Includes soap, sanitizer, and educational flyers', 120.00, 'Education', 150, 'In Stock', 'https://via.placeholder.com/150'),
('Postpartum Care Pack', 'Specially curated items for new mothers', 600.00, 'Health', 40, 'In Stock', 'https://via.placeholder.com/150'),
('Disinfectant Surface Wipes', 'Pack of 50 anti-bacterial wipes', 180.00, 'Hygiene', 90, 'In Stock', 'https://via.placeholder.com/150'),
('Reusable Cloth Pads', 'Set of 3 washable bamboo cloth pads', 300.00, 'Hygiene', 60, 'In Stock', 'https://via.placeholder.com/150'),
('Nutrition Shake', 'Protein and mineral rich supplement for women', 400.00, 'Health', 70, 'In Stock', 'https://via.placeholder.com/150');

-- 5. Insert Community Messages
INSERT INTO community_messages (message, category, timestamp, sender_name, likes) VALUES 
('Hello everyone! Excited to join this community.', 'General', '2024-03-01 10:00:00', 'Anjali Sharma', 5),
('Does anyone have tips for early pregnancy nutrition?', 'Health', '2024-03-01 11:30:00', 'Priya Singh', 12),
('The new hygiene kits are wonderful, thank you!', 'Feedback', '2024-03-01 12:15:00', 'Meera Bai', 8),
('Volunteering this weekend in Pune, who is joining?', 'Volunteer', '2024-03-01 14:00:00', 'Shubham Kumar', 20),
('Always remember to stay hydrated during work!', 'Wellness', '2024-03-01 15:45:00', 'Sunita Kapoor', 15),
('Happy International Womens Day to all!', 'General', '2024-03-01 09:00:00', 'Sneha Patil', 50),
('The educational session last week was very insightful.', 'Education', '2024-03-02 10:30:00', 'Kavita Devi', 7),
('Looking for a donor for the local community center.', 'Requests', '2024-03-02 12:00:00', 'Rahul Verma', 3),
('Mental health is just as important as physical health.', 'Wellness', '2024-03-02 16:20:00', 'Deepa Malik', 25),
('Welcome new members to Together For Her!', 'General', '2024-03-03 08:30:00', 'Sunita Kapoor', 30);

-- 6. Insert Feedback
INSERT INTO feedback (text, c_from, type, status, created_at, user_id) VALUES 
('The application is very easy to use. Thank you!', 'Anjali Sharma', 'Appreciation', 'APPROVED', '2024-03-01', 1),
('I would love to see more local language support.', 'Priya Singh', 'Suggestion', 'PENDING', '2024-03-02', 2),
('The kit delivery was a bit late this time.', 'Meera Bai', 'Service', 'PENDING', '2024-03-03', 4),
('Found a small bug in the profile photo upload.', 'Kavita Devi', 'Bug Report', 'APPROVED', '2024-03-04', 5),
('Great initiative for women empowerment.', 'Rani Mukherji', 'Appreciation', 'APPROVED', '2024-03-05', 6),
('Can we have a section for child health as well?', 'Sita Ram', 'Suggestion', 'PENDING', '2024-03-06', 7),
('The volunteer support was exceptional.', 'Geeta Phogat', 'Appreciation', 'APPROVED', '2024-03-07', 8),
('Please add more payment options for donations.', 'Lata Mangeshkar', 'Suggestion', 'APPROVED', '2024-03-08', 9),
('I am happy to be part of this movement.', 'Asha Bhosle', 'Appreciation', 'APPROVED', '2024-03-09', 10),
('Keep up the good work!', 'Anjali Sharma', 'Appreciation', 'APPROVED', '2024-03-10', 1);
