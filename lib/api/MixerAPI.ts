import BaseAPI from "./BaseAPI";
import * as WebRequest from 'web-request';

/**
 * Mixer Passthrough APIs.
 */
export default class MixerAPI extends BaseAPI {

  /**
   * Get Mixer user data by username.
   * @param userName The username or ID that needs to be fetched.
   */
  async getMixerUserByName(userName: string) {
    let result = await WebRequest.get(`${this._baseAddress}/mixer/users/${userName}`);
    let tmp = JSON.stringify(result.content);
    let obj = JSON.parse(tmp);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

}