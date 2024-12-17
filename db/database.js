const properties = require("./json/properties.json");
const users = require("./json/users.json");
const { Pool } = require("pg");

const pool = new Pool({
  user: "development",
  password: "development",
  host: "localhost",
  database: "lightbnb",
});

/// Users

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function (email) {
  return pool
    .query(`SELECT id, name, email, password
   FROM users
   WHERE email = $1`, [email]
    ).then((result) => {
      if(result.rows.length > 0) {
        return result.rows[0]
      } else {
        return null
      }
  }).catch((err) => console.log(err))
};

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function (id) {
  return pool
    .query(`SELECT id, name, email, password
      FROM users
      WHERE id = $1`, [id]
    ).then((result) => result.rows[0])
};

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser = function (user) {
  return pool
    .query(`INSERT INTO users (name, email, password)
      VALUES ($1, $2, $3)
      RETURNING *`, [
        user.name, 
        user.email, 
        user.password
      ]
    ).then((result) => result.rows[0])
};

/// Reservations

/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function (guest_id, limit = 10) {

  return pool
    .query(
      `SELECT * FROM reservations
      JOIN properties ON properties.id = reservations.property_id
      WHERE guest_id = $1 LIMIT $2`, [guest_id, limit]
    )
    .then((result) => result.rows)
    .catch((err) => console.log(err.message))
};

/// Properties

/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */

const getAllProperties = function (options, limit = 10) {
  const queryParams = [];

  // Base query
  let queryString = `
  SELECT properties.*, avg(property_reviews.rating) as average_rating
  FROM properties
  JOIN property_reviews ON properties.id = property_id
  `;

  // Adding WHERE conditions dynamically
  const conditions = [];

  if (options.city) {
    queryParams.push(`%${options.city}%`);
    conditions.push(`city LIKE $${queryParams.length}`);
  }

  if (options.owner_id) {
    queryParams.push(options.owner_id);
    conditions.push(`owner_id = $${queryParams.length}`);
  }

  if (options.minimum_price_per_night) {
    queryParams.push(options.minimum_price_per_night);
    conditions.push(`cost_per_night >= $${queryParams.length}`);
  }

  if (options.maximum_price_per_night) {
    queryParams.push(options.maximum_price_per_night);
    conditions.push(`cost_per_night <= $${queryParams.length}`);
  }

  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    conditions.push(`property_reviews.rating >= $${queryParams.length}`);
  }

  // Combine all conditions into queryString
  if (conditions.length > 0) {
    queryString += `WHERE ${conditions.join(" AND ")} `;
  }

  // GROUP BY, ORDER BY, and LIMIT
  queryString += `
  GROUP BY properties.id
  ORDER BY cost_per_night
  LIMIT $${queryParams.length + 1};
  `;

  queryParams.push(limit);

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows)
    .catch((err) => {
      console.error("Database query error:", err.message);
      throw err;
    });
};


/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function (property) {
  return pool
    .query(
      `INSERT INTO properties (
        owner_id, 
        title, 
        description, 
        thumbnail_photo_url, 
        cover_photo_url, 
        cost_per_night, 
        street, 
        city, 
        province, 
        post_code, 
        country, 
        parking_spaces, 
        number_of_bathrooms, 
        number_of_bedrooms
      )
      VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14
      )
      RETURNING *;`,
      [
        property.owner_id,
        property.title,
        property.description,
        property.thumbnail_photo_url,
        property.cover_photo_url,
        property.cost_per_night,
        property.street,
        property.city,
        property.province,
        property.post_code,
        property.country,
        property.parking_spaces,
        property.number_of_bathrooms,
        property.number_of_bedrooms,
      ]
    )
    .then((result) => result.rows[0])
    .catch((err) => {
      console.error("Insert error:", err.message);
      throw err;
    });
};


module.exports = {
  getUserWithEmail,
  getUserWithId,
  addUser,
  getAllReservations,
  getAllProperties,
  addProperty,
};
