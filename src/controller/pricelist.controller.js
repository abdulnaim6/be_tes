import pricelistModel from "../model/pricelist.model.js";

const pricelistController = {
  listPrice: async function (req, res) {
    try {
      const result = await pricelistModel.getAllPricelist();
      res.status(200).json({
        message: "Get All Price Success",
        data: result.rows,
      });
    } catch (err) {
      console.error("Get Price Failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  createPricelist: async function (req, res) {
    try {
      const { id, code, price, model_id, year_id } = req.body;
      const result = await pricelistModel.postPricelist(
        id,
        code,
        price,
        model_id,
        year_id
      );

      res.status(201).json({
        message: "Create pricelist success",
        data: result.data,
      });
    } catch (err) {
      console.error("Create pricelist failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  updatePricelist: async function (req, res) {
    try {
      const { id } = req.params;
      const { code, price, model_id, year_id } = req.body;
      const result = await pricelistModel.updatePricelist({
        id,
        code,
        price,
        model_id,
        year_id,
      });

      if (result.rowCount === 0) {
        return res.status(404).json({ message: "Price not found" });
      }

      res.status(200).json({
        message: "Update Price success",
        data: result.data,
      });
    } catch (err) {
      console.error("Update Price failed", err);
      res.status(500).json({
        message: "Internal Server Error",
      });
    }
  },

  deletePricelist: async function (req, res) {
    try {
      const { id } = req.params;
      const result = await pricelistModel.deletePricelist(id);
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
export default pricelistController;
