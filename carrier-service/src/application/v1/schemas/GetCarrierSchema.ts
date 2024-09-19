import Joi from 'joi';

const getCarrierSchema = Joi.object().keys({
  CPF: Joi.string().length(11).required(),
});

export default getCarrierSchema;
