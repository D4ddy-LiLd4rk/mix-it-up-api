import { MixItUpClient } from "../MixItUpClient";
/** @private */
export default class BaseAPI {
  protected readonly _baseAddress: string = "http://localhost:8911/api/";
  protected readonly _client: MixItUpClient;
  constructor(client: MixItUpClient) {
    this._client = client;
  };
}