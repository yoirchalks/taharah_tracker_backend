import Joi from "joi";

const schema = Joi.object({
  email: Joi.string().email().required(),
  requestingOtp: Joi.boolean().default(false),
  password: Joi.when("requestingOtp", {
    is: true,
    then: Joi.forbidden(),
    otherwise: Joi.string().min(8).max(25).required(),
  }),
});

const otpSchema = Joi.object({
  UUID: Joi.string().required(),
  OTP: Joi.string().min(6).max(6),
  IAT: Joi.string().required(),
  used: Joi.boolean().required(),
});

export default function (data: any, isOtp: boolean) {
  return isOtp ? otpSchema.validate(data) : schema.validate(data);
}
