export default interface IDepositAccountService {
  deposit(CPF: string, amount: number): Promise<void>;
}
