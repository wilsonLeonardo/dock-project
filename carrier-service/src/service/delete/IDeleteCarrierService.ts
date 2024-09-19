export default interface IDeleteCarrierService {
  deleteByCPF(cpf: string): Promise<void>;
}
