import db from "../config/db.js";

const vehicleModelModel = {
  getAllVehicle: function () {
    try {
      return db.query("SELECT * FROM vehicle_model");
    } catch (err) {
      console.log(err.message);
    }
  },

  postVehicle: function (id, name, type_id) {
    try {
      return db.query(
        `INSERT INTO vehicle_model (id, name, type_id)
         VALUES ($1, $2, $3)`,
        [id, name, type_id]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updateVehicle: ({ id, name, type_id }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE vehicle_model SET name=$1, type_id=$2 WHERE id=$3";
      const values = [name, type_id, id];

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
      return db.query(`DELETE from vehicle_model WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default vehicleModelModel;
