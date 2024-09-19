import httpStatus from 'http-status';
import HttpError from './HttpError';

export default class ForbiddenError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.FORBIDDEN);
  }
}
