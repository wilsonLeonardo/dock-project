import Joi from 'joi';

const cpfSchema = Joi.object().keys({
  CPF: Joi.string().length(11).required(),
});

export default cpfSchema;
