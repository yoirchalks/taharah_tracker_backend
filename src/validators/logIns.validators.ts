import Joi from "joi";

const postSchema = Joi.object({
  password: Joi.string().min(8).max(25),
  email: Joi.string().email(),
}).or("password", "email");

export default function (data: { email?: string; password?: string }) {
  return postSchema.validate(data);
}
