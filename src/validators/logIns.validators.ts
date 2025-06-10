import Joi from "joi";

const postSchema = Joi.object({
  userId: Joi.string().min(36).max(36).required(),
  password: Joi.string().min(8).max(25),
  email: Joi.string().email(),
  otp: Joi.string().min(6).max(6),
}).xor("password", "email", "otp");

export default function (data: { email?: string; password?: string }) {
  return postSchema.validate(data);
}
