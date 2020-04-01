import BaseAPI from "./BaseAPI";
import * as WebRequest from 'web-request';
import { IBroadcastObject } from '../interfaces/IBroadcastObject';

/**
 * Operations related to MixPlay users.
 */
export default class MixPlayAPI extends BaseAPI {

  /**
   * Gets All Active MixPlay Users.
   */
  async getAllMixPlayUsers() {
    let result = await WebRequest.get(`${this._baseAddress}/mixplay/users`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return JSON.parse(result.content);
  }

  /**
   * Gets the specified MixPlay user by their participant ID.
   * @param id The ID that needs to be fetched. This can be the MixPlay participant ID or the Mixer User ID.
   */
  async getMixPlayUserByID(id: number) {
    let result = await WebRequest.get(`${this._baseAddress}/mixplay/user/${id}`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return JSON.parse(result.content);
  }

  /**
   * Gets the specified MixPlay user by their participant ID.
   * @param userName The ID that needs to be fetched. This can be the Mixer UserName.
   */
  async getMixPlayUserByName(userName: string) {
    let result = await WebRequest.get(`${this._baseAddress}/mixplay/user/${userName}`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return JSON.parse(result.content);
  }

  /**
   * Sends a broadcast message to MixPlay.
   * @param msg The data to broadcast and related scopes.
   */
  async broadcastToMixPlay(msg: IBroadcastObject) {
    let result = await WebRequest.post(`${this._baseAddress}/mixplay/broadcast`, { json: msg});
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return JSON.parse(result.content);
  }

}