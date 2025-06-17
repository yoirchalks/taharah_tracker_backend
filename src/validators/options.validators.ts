import Joi from "joi";

const postSchema = Joi.object({
  userId: Joi.string().required(),
  location: Joi.string().required(),
  receiveAlerts: Joi.boolean().required(),
});
const putSchema = Joi.object({});

export default function (data: {}, verb: "post" | "put") {
  return verb === "post" ? postSchema.validate(data) : putSchema.validate(data);
}
