export default interface ICloseAccountService {
  close(CPF: string): Promise<void>;
}
