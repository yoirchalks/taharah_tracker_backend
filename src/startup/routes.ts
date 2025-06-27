import type { Application } from "express";

import locationsRouter from "../routes/locations.js";
import logInsRouter from "../routes/logIns.js";
import optionsRouter from "../routes/options.js";
import otpRouter from "../routes/otp.js";
import periodsRouter from "../routes/periods.js";
import signUpRoute from "../routes/signUps.js";
import logOutRouter from "../routes/logOut.js";
import emailsRouter from "../routes/emails.js";

export default function routes(app: Application): void {
  app.use("/api/signUps", signUpRoute);
  app.use("/api/locations", locationsRouter);
  app.use("/api/logIns", logInsRouter);
  app.use("/api/otp", otpRouter);
  app.use("/api/periods", periodsRouter);
  app.use("/api/options", optionsRouter);
  app.use("/api/logOut", logOutRouter);
  app.use("/api/emails", emailsRouter);
}
