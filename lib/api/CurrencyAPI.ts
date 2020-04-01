import BaseAPI from "./BaseAPI";
import { Currency } from '../obj/Currency';
import * as WebRequest from 'web-request';
import { User } from '../obj/User';

/**
 * Operations related to Mix It Up Currency data.
 */
export default class UserAPI extends BaseAPI {

  /**
   * Gets a list of all currencies available.
   */
  async getAllCurrencies(): Promise<Currency[]> {
    let result = await WebRequest.get(`${this._baseAddress}/currency`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * ets a specific currency.
   * @param id The currency ID to query.
   */
  async getCurrencyByID(id: string): Promise<Currency> {
    let result = await WebRequest.get(`${this._baseAddress}/currency/${id}`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new Currency(), obj);
  }

  /**
   * Gets a list users ordered by currency quantity descending. 
   * The streamer and anyone marked as currency/rank exempt will not be visible in this list.
   * @param id The currency ID to query.
   */
  async getUsersByCurrency(id: string): Promise<User[]> {
    let result = await WebRequest.get(`${this._baseAddress}/currency/${id}/top`);
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
    let curr: Currency = await this.getCurrencyByID(currencyID);
    curr.Amount = amount;

    let result = await WebRequest.put(`${this._baseAddress}/users/${userID}/currency/${currencyID}/adjust`, {json: curr});
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new User(), obj);
  }

  /**
   * Gives a list of users various amounts of currency.
   * @param currencyID The currency ID to query.
   * @param list The list of users and the amounts to give. Amounts MUST be positive only. Negative values will be ignored.
   */
  async addCurrencyToUsers(currencyID: string, list: IAddCurrency[]): Promise<User[]> {
    let result = await WebRequest.post(`${this._baseAddress}/currency/${currencyID}/give`, {json: list});
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

}

interface IAddCurrency {
  /**
   * The amount to adjust the user's currency. This amount may be positive or negative.
   */
  Amount: number,
  /**
   * The username or ID to adjust.
   */
  UsernameOrID: string
}