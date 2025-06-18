import express, { type Request, type Response } from "express";
import routes from "./startup/routes.js";
import cookieParser from "cookie-parser";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
app.use(cookieParser());
app.use(express.json());

routes(app);

app.use(errorHandler);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
