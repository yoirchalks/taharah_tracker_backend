import Joi from "joi";

const queryParamSchema = Joi.object({
  startDate: Joi.string().default(() => new Date().toISOString()),
  endDate: Joi.string().default(() => new Date().toISOString()),
  page: Joi.number().default(1),
  limit: Joi.number().min(1).max(100).default(10),
});

export interface QueryData {
  startDate: string;
  endDate: string;
  page: number;
  limit: number;
}

export const validateQueryParams = function (data: {}) {
  return queryParamSchema.validate(data);
};

const postSchema = Joi.object({
  periodType: Joi.string()
    .required()
    .valid("period", "staining", "birthBoy", "birthGirl", "miscarriage"),
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
