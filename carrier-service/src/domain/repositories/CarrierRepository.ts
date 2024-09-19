import IAccountRepository from './ICarrierRepository';
import NotFoundError from '@domain/exceptions/NotFoundError';
import ConflictError from '@domain/exceptions/ConflictError';
import { Carrier, ICarrier } from '@domain/schemas/Carrier';

export default class AccountRepository implements IAccountRepository {
  async create(carrier: ICarrier): Promise<ICarrier> {
    const carrierAlreadyExists = await Carrier.get(carrier.CPF);

    if (carrierAlreadyExists) {
      throw new ConflictError('Carrier already exists!');
    }

    const carrierCreated = new Carrier(carrier);
    const item = await carrierCreated.save();

    const itemJSON = item.toJSON() as ICarrier;

    itemJSON.createdAt = new Date(itemJSON.createdAt as unknown as number);
    itemJSON.updatedAt = new Date(itemJSON.updatedAt as unknown as number);

    return itemJSON;
  }
  async getByCPF(CPF: string): Promise<ICarrier> {
    const carrier = await Carrier.get(CPF);

    if (!carrier) {
      throw new NotFoundError('Carrier not found!');
    }

    return carrier.toJSON() as ICarrier;
  }
  async delete(CPF: string): Promise<void> {
    const carrier = await Carrier.get(CPF);

    if (!carrier) {
      throw new NotFoundError('Carrier not found!');
    }

    await carrier.delete();
  }
}
