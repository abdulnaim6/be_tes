import vehicleModel from "../model/vehicle_brand.model.js";
import verifyToken from "../middleware/auth.middleware.js";

const vehicleController = {
  listVehicle: async function (req, res) {
    try {
      const result = await vehicleModel.getAllVehicle();
      res.status(200).json({
        message: "Get All Vehicle Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get Vehicle Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createVehicle: [
    verifyToken,
    async function (req, res) {
      try {
        const { id, name } = req.body;
        const result = await vehicleModel.postVehicle(id, name);

        res.status(201).json({
          message: "Create vehicle success",
          data: result.data,
        });
      } catch (err) {
        console.error("Create vehicle failed", err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    },
  ],

  updateVehicle: [
    verifyToken,
    async function (req, res) {
      try {
        const { id } = req.params;
        const { name } = req.body;
        const result = await vehicleModel.updateVehicle({ id, name });

        if (result.rowCount === 0) {
          return res.status(404).json({ message: "Vehicle not found" });
        }

        res.status(200).json({
          message: "Update Vehicle success",
          data: result.data,
        });
      } catch (err) {
        console.error("Update vehicle failed", err);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    },
  ],

  deleteVehicle: [
    verifyToken,
    async function (req, res) {
      try {
        const { id } = req.params;
        const result = await vehicleModel.deleteVehicle(id);

        if (result) {
          res.status(200).json({
            message: "Delete success",
            data: result.data,
          });
        } else {
          res.status(404).json({
            message: "Vehicle not found",
          });
        }
      } catch (err) {
        console.error(err.message);
        res.status(500).json({
          message: "Internal Server Error",
        });
      }
    },
  ],

  search: (req, res) => {
    const { keyword, sort } = req.query;
    vehicleModel
      .searchByName(keyword, sort)
      .then((result) => {
        res.json(result.rows);
      })
      .catch((err) => {
        res.json({ message: err.message });
      });
  },

  pagination: async (req, res) => {
    try {
      const { limit, page } = req.query;
      const pageValue = page ? Number(page) : 1;
      const limitValue = limit ? Number(limit) : 2;
      const offsetValue = pageValue === 1 ? 0 : (pageValue - 1) * limitValue;

      const allData = await vehicleModel.selectPaginate();
      const totalData = Number(allData.rows[0].total);
      const result = await vehicleModel.paginations(limitValue, offsetValue);

      const pagination = {
        currentPage: pageValue,
        dataPerPage: limitValue,
        totalPage: Math.ceil(totalData / limitValue),
        totalData,
        result,
      };

      res.json({
        message: "OK",
        result: pagination.result.rows,
      });
    } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: "Internal Server Error" });
    }
  },
};

export default vehicleController;
