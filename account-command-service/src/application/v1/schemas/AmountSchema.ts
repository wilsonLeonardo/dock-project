import Joi from 'joi';

const amountSchema = Joi.object().keys({
  amount: Joi.number().positive().required(),
});

export default amountSchema;
