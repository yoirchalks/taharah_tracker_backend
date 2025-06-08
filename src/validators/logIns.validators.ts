import Joi from "joi";

const postSchema = Joi.object({
  password: Joi.string(),
  email: Joi.string(),
}).or("password", "email");

export default function (data: { email?: string; password?: string }) {
  return postSchema.validate(data);
}
