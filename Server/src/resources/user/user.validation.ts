
import Joi from "joi";

const register = Joi.object({
    username: Joi.string().max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).required(),
});

const login = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
});

const update = Joi.object({
    userId: Joi.string().required(),
    update: {
        dateFrom: Joi.string().required(),
        forDays: Joi.number().min(1).required(),
        cardNum: Joi.string().required(),
        costPrice: Joi.number().min(1).required(),
        reserveId: Joi.string().required()
    }
});


export default { register, login, update }; 