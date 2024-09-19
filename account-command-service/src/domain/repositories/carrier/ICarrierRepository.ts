import { ICarrier } from '@domain/schemas/Carrier';

export default interface ICarrierRepository {
  getByCPF(CPF: string): Promise<ICarrier | null>;
}
