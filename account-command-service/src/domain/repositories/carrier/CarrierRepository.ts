import { ICarrier } from '../../schemas/Carrier';
import ICarrierRepository from './ICarrierRepository';
import { ILogger } from '../../../infrastructure/logger/ILogger';
import InternalServerError from '@domain/exceptions/InternalServerError';
import { buildErrorInfo } from '@infrastructure/parser/ErrorInfo';
import ICarrierRequester from '../../../infrastructure/http/ICarrierRequester';

export default class CarrierRepository implements ICarrierRepository {
  private requester: ICarrierRequester;
  private logger: ILogger;

  constructor(requester: ICarrierRequester, logger: ILogger) {
    this.requester = requester;
    this.logger = logger;
  }

  async getByCPF(CPF: string): Promise<ICarrier | null> {
    try {
      const response = await this.requester.getCarrierByCPF(CPF);

      return response.data as ICarrier;
    } catch (err: any) {
      const errorInfo = buildErrorInfo(err);

      if (err.response?.status === 404) {
        return null;
      }

      this.logger.error(`Error when getting carrier by CPF - ${CPF}`, {
        error: errorInfo.errorMessage,
        stacktrace: errorInfo.stackTrace,
      });

      throw new InternalServerError('Error when getting carrier by CPF');
    }
  }
}
