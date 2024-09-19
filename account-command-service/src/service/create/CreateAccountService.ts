import { IAccount } from '@domain/schemas/Account';
import ICreateAcccountService from './ICreateAccountService';
import IAccountRepository from '@domain/repositories/account/IAccountRepository';
import generateAccountNumber from '@utils/generateAccountNumber';
import generateAgencyNumber from '@utils/generateAgencyNumber';
import ICarrierRepository from '@domain/repositories/carrier/ICarrierRepository';
import NotFoundError from '@domain/exceptions/NotFoundError';
import IEventRepository from '@domain/repositories/event/IEventRepository';
import { EventType } from '@domain/schemas/Event';
import IEventDispatcher from '@domain/events/IEventDispatcher';
import Service from '@service/Service';

export default class CreateAcccountService extends Service implements ICreateAcccountService {
  constructor(
    private accountRepository: IAccountRepository,
    private carrierRepository: ICarrierRepository,
    eventRepository: IEventRepository,
    eventDispatcher: IEventDispatcher,
  ) {
    super(eventRepository, eventDispatcher);
  }

  async create(CPF: string): Promise<IAccount> {
    const carrierExists = await this.carrierRepository.getByCPF(CPF);

    if (!carrierExists) {
      throw new NotFoundError(`Carrier with CPF ${CPF} not found`);
    }

    const data: IAccount = {
      holderCpf: CPF,
      accountNumber: generateAccountNumber(),
      agency: generateAgencyNumber(),
      balance: 0,
      isBlocked: false,
    };

    const account = await this.accountRepository.createAccount(data);

    await this.handleEvent(EventType.Created, CPF, account);

    return account;
  }
}
