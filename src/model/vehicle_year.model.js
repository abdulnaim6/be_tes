import db from "../config/db.js";

const vehicleYearModel = {
  getAllYear: function () {
    try {
      return db.query("SELECT * FROM vehicle_year");
    } catch (err) {
      console.log(err.message);
    }
  },

  postYear: function (id, year) {
    try {
      return db.query(
        `INSERT INTO vehicle_year (id, year)
         VALUES ($1, $2)`,
        [id, year]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateYear: ({ id, year }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE vehicle_year SET year=$1 WHERE id=$2";
      const values = [year, id];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating vehicle year:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteYear: function (id) {
    try {
      return db.query(`DELETE from vehicle_year WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default vehicleYearModel;
