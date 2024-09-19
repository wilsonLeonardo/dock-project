import { ICarrier } from '@domain/schemas/Carrier';
import IGetCarrierService from './IGetCarrierService';
import ICarrierRepository from '@domain/repositories/ICarrierRepository';

export default class GetCarrierService implements IGetCarrierService {
  constructor(private carrierRepository: ICarrierRepository) {}

  async getByCPF(cpf: string): Promise<ICarrier> {
    const carrier = await this.carrierRepository.getByCPF(cpf);

    return carrier;
  }
}
