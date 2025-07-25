import express from "express";
import routes from "./startup/routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";
import { initGeoDb } from "./startup/geoDb.js";
import dotenv from "dotenv";
import cors from "cors";
import { existsSync } from "fs";

const envFile =
  process.env.NODE_ENV === "production" ? ".env" : ".env.development";

if (process.env.NODE_ENV !== "production" && existsSync(".env")) {
  dotenv.config();
} else {
  console.log("Skipping dotenv config, relying on environment variables");
}

const app = express();
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: process.env.CORS,
    credentials: true,
  })
);
initGeoDb();

routes(app);

app.use(errorHandler);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`listening on prot ${port}`);
});
