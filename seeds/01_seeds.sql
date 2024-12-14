INSERT INTO users (name, email, password)
VALUES ('Josh Horker', 'thedude@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Mosh Storker', 'theduderdy@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.'),
('Rash Blorker', 'thereeek@email.com', '$2a$10$FB/BOAVhpuLvpOREQVmvmezD4ED/.JBIDRh70tGevYzYzQgFId2u.');

INSERT INTO properties (owner_id, title, description, thumbnail_photo_url, cover_photo_url, cost_per_night, parking_spaces, number_of_bathrooms, number_of_bedrooms, country, street, city, province, post_code)
VALUES
(1, 'Luxury Beach House', 'A beautiful beachfront property with stunning ocean views and modern amenities.', 
 'https://example.com/thumbnail1.jpg', 'https://example.com/cover1.jpg', 
 500, 2, 3, 4, 'USA', '123 Ocean Drive', 'Santa Monica', 'California', '90401'),

(2, 'Cozy Mountain Cabin', 'A secluded cabin in the mountains perfect for relaxation and hiking adventures.', 
 'https://example.com/thumbnail2.jpg', 'https://example.com/cover2.jpg', 
 300, 1, 2, 2, 'Canada', '456 Pine Road', 'Banff', 'Alberta', 'T1L 1J3'),

(3, 'Modern City Apartment', 'A fully furnished apartment in the heart of the city, close to all attractions.', 
 'https://example.com/thumbnail3.jpg', 'https://example.com/cover3.jpg', 
 200, 0, 1, 1, 'UK', '789 Main Street', 'London', 'Greater London', 'W1A 1AA');

INSERT INTO reservations (start_date, end_date, property_id, guest_id)
VALUES ('2018-09-11', '2018-09-26', 1, 1),
('2019-01-04', '2019-02-01', 2, 2),
('2021-10-01', '2021-10-14', 3, 3);

INSERT INTO property_reviews (guest_id, property_id, reservation_id, rating, message)
VALUES
(1, 1, 1, 5, 'Absolutely stunning beach house! The view was incredible, and the amenities were top-notch. Highly recommend!'),

(2, 2, 2, 4, 'The mountain cabin was cozy and peaceful. Great for a relaxing getaway, but the WiFi was a bit spotty.'),

(3, 3, 3, 3, 'The city apartment was convenient and close to everything, but it could use a deep clean and some updates.');
