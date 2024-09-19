import { AxiosHeaders, AxiosResponse } from 'axios';
import HttpRequester from './HttpRequester';
import ICarrierRequester from './ICarrierRequester';
import http from 'http';

export default class CarrierRequester extends HttpRequester implements ICarrierRequester {
  defaultHeaders = new AxiosHeaders();

  constructor(planPrefixURL: string, agent?: http.Agent) {
    super(planPrefixURL, agent);
  }
  async getCarrierByCPF(CPF: string): Promise<AxiosResponse> {
    return await this.makeRequest('get', `/v1/carrier/${CPF}`, undefined, this.defaultHeaders);
  }
}
