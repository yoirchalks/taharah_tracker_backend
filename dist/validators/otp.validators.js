import Joi from "joi";
const otpSchema = Joi.object({
    UUID: Joi.string().required(),
    OTP: Joi.string().min(6).max(6),
    IAT: Joi.string().required(),
    used: Joi.boolean().required(),
});
export default function (data) {
    return otpSchema.validate(data);
}
