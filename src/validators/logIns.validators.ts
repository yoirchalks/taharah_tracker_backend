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

export default function (data: any) {
  return schema.validate(data);
}
