import Joi from "joi";

const craft = Joi.object({
    model: Joi.string().max(30).required(),
    image: Joi.string().required(),
    doors: Joi.number().min(2).required(),
    seats: Joi.number().min(2).required(),
    transmission: Joi.string().required(),
    price: Joi.number().required(),
    year: Joi.number().min(2000).required(),
    ownerId: Joi.string().required(),
});

const rentInfo = Joi.object({
     rentId: Joi.string().required(),
     updateRent: {
     resOwner: Joi.string().required(),
     dateFrom: Joi.string().required(),
     forDays: Joi.number().min(1).required(),
     cardNum: Joi.string().required(),
     costPrice: Joi.number().min(1).required(),
     }
})


export default { craft, rentInfo };