import { ICarrier } from '@domain/schemas/Carrier';
import ICreateCarrierService from './ICreateCarrierService';
import ICarrierRepository from '@domain/repositories/ICarrierRepository';

export default class CreateCarrierService implements ICreateCarrierService {
  constructor(private carrierRepository: ICarrierRepository) {}

  async create(data: ICarrier): Promise<ICarrier> {
    const carrier = await this.carrierRepository.create(data);

    return carrier;
  }
}
