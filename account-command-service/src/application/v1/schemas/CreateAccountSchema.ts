import Joi from 'joi';

const createAccountSchema = Joi.object().keys({
  CPF: Joi.string().length(11).required(),
});

export default createAccountSchema;
