import Joi from "joi";

const postSchema = Joi.object({
  password: Joi.string().min(8).max(25),
  email: Joi.string().email().required(),
  requestingOtp: Joi.boolean(),
  otp: Joi.string().min(6).max(6),
}).xor("password", "otp", "requestingOtp");

export default function (data: { email?: string; password?: string }) {
  return postSchema.validate(data);
}
