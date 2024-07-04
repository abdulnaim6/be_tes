import vehicleYearModel from "../model/vehicle_year.model.js";

const vehicleYearController = {
  listYear: async function (req, res) {
    try {
      const result = await vehicleYearModel.getAllYear();
      res.status(200).json({
        message: "Get All Year Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get Year Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createYear: async function (req, res) {
    try {
      const { id, year } = req.body;
      const result = await vehicleYearModel.postYear(id, year);

      res.status(201).json({
        message: "Create Year Success",
        data: result.data,
      });
    } catch (err) {
      console.error("Create year failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updateYear: async function (req, res) {
    try {
      const { id } = req.params;
      const { year } = req.body;
      const result = await vehicleYearModel.updateYear({ id, year });

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Year not found" });
      }

      res.status(200).json({
        message: "Update year success",
        data: result.data,
      });
    } catch (err) {
      console.error("Update year failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteYear: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await vehicleYearModel.deleteYear(id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: " year not found",
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
export default vehicleYearController;
