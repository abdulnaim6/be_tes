import db from "../config/db.js";

const userModel = {
  getAllUsers: function () {
    try {
      return db.query("SELECT * FROM users");
    } catch (err) {
      console.log(err.message);
    }
  },

  postUsers: function (id, name, password, is_admin) {
    try {
      return db.query(
        `INSERT INTO users (id, name, password, is_admin)
         VALUES ($1, $2, $3, $4)`,
        [id, name, password, is_admin]
      );
    } catch (err) {
      console.log(err.message);
    }
  },

  postLogin: (name) => {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM users WHERE name = '${name}'`, (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
  },

  updateUsers: ({ id, name, is_admin }) => {
    return new Promise((resolve, reject) => {
      const query = "UPDATE users SET name=$1, is_admin=$2 WHERE id=$3";
      const values = [name, is_admin, id];

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });
  },

  deleteUsers: function (id) {
    try {
      return db.query(`DELETE from users WHERE id=${id}`);
    } catch (err) {
      console.log(err.message);
    }
  },

  getUserById: async function (id) {
    try {
      const result = await db.query("SELECT * FROM users WHERE id = $1", [id]);
      return result.rows[0];
    } catch (err) {
      console.error("Error fetching user by ID:", err);
      throw err;
    }
  },
};
export default userModel;
