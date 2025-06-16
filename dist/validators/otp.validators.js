import Joi from "joi";
const otpSchema = Joi.object({
    id: Joi.string().required(),
    userId: Joi.string().required(),
    OTP: Joi.string().min(6).max(6),
});
export default function (data) {
    return otpSchema.validate(data);
}
