import { ICarrier } from '@domain/schemas/Carrier';

export default interface ICreateCarrierService {
  create(data: ICarrier): Promise<ICarrier>;
}
