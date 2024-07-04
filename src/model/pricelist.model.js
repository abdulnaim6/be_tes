import db from "../config/db.js";

const pricelistModel = {
  getAllPricelist: function () {
    try {
      return db.query("SELECT * FROM price_list");
    } catch (err) {
      console.log(err.message);
    }
  },

  postPricelist: function (id, code, price, model_id, year_id) {
    try {
      return db.query(
        `INSERT INTO price_list (id, code, price, model_id, year_id)
         VALUES ($1, $2, $3, $4, $5)`,
        [id, code, price, model_id, year_id]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  updatePricelist: ({ id, code, price, model_id, year_id }) => {
    return new Promise((resolve, reject) => {
      const query =
        "UPDATE price_list SET code=$1, price=$2, model_id=$3, year_id=$4 WHERE id=$5";
      const values = [code, price, model_id, year_id, id];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating pricelist:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deletePricelist: function (id) {
    try {
      return db.query(`DELETE from price_list WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },
};
export default pricelistModel;
