import userModel from "../model/user.model.js";
import generateToken from "../helper/jwt.js";
import bcrypt from "bcrypt";

const userController = {
  listUser: async function (req, res) {
    try {
      const result = await userModel.getAllUsers();
      res.status(200).json({
        message: "Get All User Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get User Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createUser: async function (req, res) {
    try {
      const { id, name, password, is_admin } = req.body;
      const hashedPassword = await bcrypt.hash(password, 10);
      const result = await userModel.postUsers(
        id,
        name,
        hashedPassword,
        is_admin
      );

      res.status(201).json({
        message: "Create user success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Create user failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  loginUser: async (req, res) => {
    try {
      const { name } = req.body;
      const result = await userModel.postLogin(name);

      if (result.rowCount > 0) {
        const user = result.rows[0];
        const token = await generateToken({
          user: user,
        });

        return res.status(200).json({
          message: "Login successful",
          token: token,
          data: user,
        });
      } else {
        res.status(400).json({ message: "Invalid email" });
      }
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({
        error: error.message,
        message: "An error occurred during login",
      });
    }
  },

  updateUser: async function (req, res) {
    try {
      const { id } = req.params;
      const { name, is_admin } = req.body;
      const result = await userModel.updateUsers({ id, name, is_admin });

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json({
        message: "Update user success",
        data: result.data,
      });
    } catch (err) {
      console.error("Update user failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteUsers: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await userModel.deleteUsers(id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "Users not found",
        });
      }
    } catch (err) {
      console.error(err.message);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },
};
export default userController;
