import Joi from "joi";
const postSchema = Joi.object({
    name: Joi.string().required().min(5).max(30),
    email: Joi.string().email().min(10).max(30).required(),
    password: Joi.string().required().min(8).max(25),
});
const putSchema = Joi.object({
    name: Joi.string().min(5).max(30),
    email: Joi.string().email().min(10).max(30),
    password: Joi.string().min(8).max(25),
});
export default function (data, verb) {
    return verb === "post" ? postSchema.validate(data) : putSchema.validate(data);
}
