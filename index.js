import express from "express";
import bodyParser from "body-parser";
import userRouter from "./src/router/user.router.js";
import vehicleRouter from "./src/router/vehicle_brand.router.js";
import vehicleTypeRouter from "./src/router/vehicle_type.router.js";
import vehicleModelRouter from "./src/router/vehicle_model.router.js";
import vehicleYearRouter from "./src/router/vehicle_year.router.js";
import priceListRouter from "./src/router/pricelist.router.js";
import cors from "cors";

const app = express();
const port = 3004;
app.use(express.static("public"));
app.use(express.json());
app.use(cors());
app.use(userRouter);
app.use(vehicleRouter);
app.use(vehicleTypeRouter);
app.use(vehicleModelRouter);
app.use(vehicleYearRouter);
app.use(priceListRouter);
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.get("/");

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
