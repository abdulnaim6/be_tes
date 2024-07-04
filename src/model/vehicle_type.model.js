import db from "../config/db.js";

const vehicleTypeModel = {
  getAllVehicle: function () {
    try {
      return db.query("SELECT * FROM vehicle_type");
    } catch (err) {
      console.log(err.message);
    }
  },

  postVehicle: function (id, name, brand_id) {
    try {
      return db.query(
        `INSERT INTO vehicle_type (id, name, brand_id)
         VALUES ($1, $2, $3)`,
        [id, name, brand_id]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateVehicle: ({ id, name, brand_id }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE vehicle_type SET name=$1, brand_id=$2 WHERE id=$3";
      const values = [name, brand_id, id];

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
      return db.query(`DELETE from vehicle_type WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default vehicleTypeModel;
