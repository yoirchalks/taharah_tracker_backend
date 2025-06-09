import express from "express";
import routes from "./startup/routes.js";
import cookieParser from "cookie-parser";

const app = express();
app.use(cookieParser());
app.use(express.json());

routes(app);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
