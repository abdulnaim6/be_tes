import vehicleTypeModel from "../model/vehicle_type.model.js";

const vehicleTypeController = {
  listVehicle: async function (req, res) {
    try {
      const result = await vehicleTypeModel.getAllVehicle();
      res.status(200).json({
        message: "Get All Vehicle type Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get Vehicle type Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createVehicle: async function (req, res) {
    try {
      const { id, name, brand_id } = req.body;
      const result = await vehicleTypeModel.postVehicle(id, name, brand_id);

      res.status(201).json({
        message: "Create vehicle type success",
        data: result.data,
      });
    } catch (err) {
      console.error("Create vehicle type failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updateVehicle: async function (req, res) {
    try {
      const { id } = req.params;
      const { name, brand_id } = req.body;
      const result = await vehicleTypeModel.updateVehicle({
        id,
        name,
        brand_id,
      });

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Vehicle type not found" });
      }

      res.status(200).json({
        message: "Update Vehicle type success",
        data: result.data,
      });
    } catch (err) {
      console.error("Update vehicle type failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deleteVehicle: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await vehicleTypeModel.deleteVehicle(id);
      if (result) {
        res.status(200).json({
          message: "Delete success",
          data: result.data,
        });
      } else {
        res.status(404).json({
          message: "Vehicle type not found",
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
export default vehicleTypeController;
