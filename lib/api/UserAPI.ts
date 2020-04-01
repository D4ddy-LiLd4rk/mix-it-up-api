import BaseAPI from "./BaseAPI";
import { User } from '../obj/User';
import * as WebRequest from 'web-request';
import { Currency } from '../obj/Currency';
import { Item } from '../obj/Item';

/**
 * Operations related to Mix It Up User data.
 */
export default class UserAPI extends BaseAPI {

  /**
   * Gets a list of all users currently active in chat.
   */
  async getAllActiveUsers(): Promise<User[]> {
    let result = await WebRequest.get(`/chat/users`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * Gets a list users ordered by viewing time descending.
   */
  async getAllUsersTop(): Promise<User[]> {
    let result = await WebRequest.get(`/users/top`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * Gets a list users ordered by currency quantity descending. 
   * The streamer and anyone marked as currency/rank exempt will not be visible in this list.
   * @param currencyID The currency ID to query.
   */
  async getAllUsersTopCurrency(currencyID: string): Promise<User[]> {
    return await this._client.currencies.getUsersByCurrency(currencyID);
  }

  /**
   * This API can be used to lookup multiple users at once.
   * @param userList Array of strings containing multiple usernames to lookup.
   */
  async getListOfUsers(userList: string[]): Promise<User[]> {
    let result = await WebRequest.post(`/users`, {json: userList});
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * This API can be used to add or subtract currency from a user.
   * @param currencyID The currency ID that needs to be adjusted.
   * @param userID The name or ID that needs to be adjusted.
   * @param amount The amount to adjust the user's currency. This amount may be positive or negative.
   */
  async addCurrencyToUser(currencyID: string, userID: string, amount: number): Promise<User> {
    return await this._client.currencies.addCurrencyToUser(currencyID, userID, amount);
  }

  /**
   * This API can be used to add or subtract inventory items from a user.
   * @param inventoryID The inventory ID that needs to be adjusted.
   * @param userID The name or ID that needs to be adjusted.
   * @param item The item to adjust for user's inventory. The amount may be positive or negative.
   */
  async addInventoryItemToUser(inventoryID: string, userID: string, item: Item): Promise<User> {
    return await this._client.inventories.addInventoryItemToUser(inventoryID, userID, item);
  }

  /**
   * Get user data by username.
   * @param userName The name or ID that needs to be fetched.
   */
  async getUserByName(userName: string): Promise<User> {
    let result = await WebRequest.get(`/users/${userName}`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new User(), obj);
  }

  /**
   * This API can be used to set user's ViewingMinutes or Currency Amount.
   * @param userName The name or ID that needs to be fetched.
   * @param viewingMinutes The number of minutes the user has been in the stream.
   * @param currencies Array of of currencies and their amount the user possesses.
   */
  async putUser(userName: string, viewingMinutes: number, currencies: Currency[]): Promise<User> {
    let usr: User = await this.getUserByName(userName);
    usr.ViewingMinutes = viewingMinutes;
    usr.CurrencyAmounts = currencies;

    let result = await WebRequest.put(`${this._baseAddress}/users/${userName}`, {json: usr}, null);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new User(), obj);
  }

}