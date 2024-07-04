import db from "../config/db.js";

const vehicleModel = {
  getAllVehicle: function () {
    try {
      return db.query("SELECT * FROM vehicle_brand");
    } catch (err) {
      console.log(err.message);
    }
  },

  postVehicle: function (id, name) {
    try {
      return db.query(
        `INSERT INTO vehicle_brand (id, name)
         VALUES ($1, $2)`,
        [id, name]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateVehicle: ({ id, name }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE vehicle_brand SET name=$1 WHERE id=$2";
      const values = [name, id];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating vehicle:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteVehicle: function (id) {
    try {
      return db.query(`DELETE from vehicle_brand WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  searchByName: (keyword, sort) => {
    return new Promise((resolve, reject) => {
      let query = `SELECT * FROM vehicle_brand WHERE name ILIKE '%${keyword}%'`;
      if (sort) {
        if (sort === "ASC") {
          query += " ORDER BY name ASC";
        } else if (sort === "DESC") {
          query += " ORDER BY name DESC";
        }
      }
      db.query(query, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  selectPaginate: () => {
    return new Promise((resolve, reject) => {
      db.query("SELECT COUNT (*) AS total FROM vehicle_brand", (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  paginations: (limit, offset) => {
    return new Promise((resolve, reject) => {
      db.query(
        "SELECT * FROM vehicle_brand LIMIT $1 OFFSET $2",
        [limit, offset],
        (err, res) => {
          if (err) {
            reject(err);
          }
          resolve(res);
        }
      );
    });
  },
};
export default vehicleModel;
