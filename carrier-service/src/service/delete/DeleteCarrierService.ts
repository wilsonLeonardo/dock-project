import IDeleteCarrierService from './IDeleteCarrierService';
import ICarrierRepository from '@domain/repositories/ICarrierRepository';

export default class DeleteCarrierService implements IDeleteCarrierService {
  constructor(private carrierRepository: ICarrierRepository) {}

  async deleteByCPF(cpf: string): Promise<void> {
    await this.carrierRepository.delete(cpf);
  }
}
