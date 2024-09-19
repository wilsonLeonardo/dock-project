import httpStatus from 'http-status';
import HttpError from './HttpError';

export default class UnprocessableEntityError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.UNPROCESSABLE_ENTITY);
  }
}
