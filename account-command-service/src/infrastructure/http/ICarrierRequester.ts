import { AxiosResponse } from 'axios';

export default interface ICarrierRequester {
  getCarrierByCPF(CPF: string): Promise<AxiosResponse>;
}
