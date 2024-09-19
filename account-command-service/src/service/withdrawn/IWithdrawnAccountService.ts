export default interface IWithdrawnAccountService {
  withdrawn(CPF: string, amount: number): Promise<void>;
}
