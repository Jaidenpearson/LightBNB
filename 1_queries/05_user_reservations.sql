SELECT reservations.id AS reservation, properties.title AS property, reservations.start_date AS reservation_date, cost_per_night
FROM properties
JOIN reservations ON property_id = properties.id
JOIN users ON guest_id = users.id
WHERE users.id = 1
ORDER BY start_date DESC
LIMIT 10;