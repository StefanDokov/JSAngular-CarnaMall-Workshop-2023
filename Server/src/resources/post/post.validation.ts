import Joi from 'joi';

const create = Joi.object({
    fname: Joi.string().required(),
    sname: Joi.string().required(),
    email: Joi.string().email().required(),
    descr: Joi.string().required(),
});

const update = Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
});

export default { create, update };