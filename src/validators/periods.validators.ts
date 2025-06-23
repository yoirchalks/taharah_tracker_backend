import Joi from "joi";

const postSchema = Joi.object({
  periodType: Joi.string()
    .required()
    .valid("period", "birth", "birthBoy", "birthGirl", "miscarriage"),
  dateTime: Joi.string()
    .required()
    .pattern(
      /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})?$/,
      "timeDate must be in valid ISO time string format"
    ),
});
const putSchema = Joi.object({});

export default function (data: {}, verb: "post" | "put") {
  return verb === "post" ? postSchema.validate(data) : putSchema.validate(data);
}
