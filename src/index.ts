import express, { type Request, type Response } from "express";
import routes from "./startup/routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import { initGeoDb } from "./startup/geoDb.js";
import cors from "cors";

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: "https://taharah-tracker-frontend.onrender.com",
    credentials: true,
  })
);
initGeoDb();

routes(app);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("listening on port 3000");
});
