import { ICarrier } from '@domain/schemas/Account';

export default interface IGetCarrierService {
  getByCPF(cpf: string): Promise<ICarrier>;
}
