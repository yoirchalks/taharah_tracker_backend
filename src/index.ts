import express from "express";
import routes from "./startup/routes.js";

const app = express();
app.use(express.json());

routes(app);

app.listen(3000, () => {
  console.log("listening on port 3000");
});
