import Joi from 'joi';

const createCarrierSchema = Joi.object().keys({
  CPF: Joi.string().length(11).required(),
  Nome: Joi.string().required(),
});

export default createCarrierSchema;
