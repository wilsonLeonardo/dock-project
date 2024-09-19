import axios, { AxiosRequestHeaders, AxiosResponse } from 'axios';
import http from 'http';
export default abstract class HttpRequester {
  url: string;

  protected constructor(url: string, protected agent?: http.Agent) {
    this.url = url;
  }

  protected makeRequest(
    method: 'post' | 'get' | 'put' = 'post',
    sufixURL?: string,
    payload: unknown = {},
    headers?: AxiosRequestHeaders,
  ): Promise<AxiosResponse> {
    return axios({
      method,
      url: sufixURL ? this.url.concat(sufixURL) : this.url,
      data: payload,
      headers: headers || undefined,
      httpAgent: this.agent,
    });
  }
}
