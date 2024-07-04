import vehicleModelModel from "../model/vehicle_model.model.js";

const vehicleModelController = {
  listVehicle: async function (req, res) {
    try {
      const result = await vehicleModelModel.getAllVehicle();
      res.status(200).json({
        message: "Get All Vehicle Model Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get Vehicle Model Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createVehicle: async function (req, res) {
    try {
      const { id, name, type_id } = req.body;
      const result = await vehicleModelModel.postVehicle(id, name, type_id);

      res.status(201).json({
        message: "Create vehicle Model success",
        data: result.data,
      });
    } catch (err) {
      console.error("Create vehicle model failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updateVehicle: async function (req, res) {
    try {
      const { id } = req.params;
      const { name, type_id } = req.body;
      const result = await vehicleModelModel.updateVehicle({
        id,
        name,
        type_id,
      });

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Vehicle model not found" });
      }

      res.status(200).json({
        message: "Update Vehicle model success",
        data: result.data,
      });
    } catch (err) {
      console.error("Update vehicle model failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteVehicle: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await vehicleModelModel.deleteVehicle(id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "Vehicle model not found",
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
export default vehicleModelController;
