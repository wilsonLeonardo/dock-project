import { ICarrier } from '@domain/schemas/Carrier';

export default interface ICarrierRepository {
  create(carrier: ICarrier): Promise<ICarrier>;
  getByCPF(CPF: string): Promise<ICarrier>;
  delete(CPF: string): Promise<void>;
}
