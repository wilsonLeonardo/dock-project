import httpStatus from 'http-status';
import HttpError from './HttpError';

export default class ConflictError extends HttpError {
  constructor(message: string) {
    super(message, httpStatus.CONFLICT);
  }
}
