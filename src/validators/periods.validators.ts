import Joi from "joi";
import { PeriodType } from "@prisma/client";

const periodTypes = Object.values(PeriodType);

const postSchema = Joi.object({
  periodType: Joi.string()
    .valid(...periodTypes)
    .required(),
  date: Joi.string()
    .required()
    .pattern(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/),
  time: Joi.string()
    .required()
    .pattern(/^([01]\d|2[0-3]):([0-5]\d)$/),
});
const putSchema = Joi.object({});

export default function (data: {}, verb: "post" | "put") {
  return verb === "post" ? postSchema.validate(data) : putSchema.validate(data);
}
