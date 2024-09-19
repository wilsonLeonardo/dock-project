import Joi from 'joi';

const accountStatementSchema = Joi.object().keys({
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
});

export default accountStatementSchema;
