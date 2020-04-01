import BaseAPI from "./BaseAPI";
import { User } from '../obj/User';
import * as WebRequest from 'web-request';
import { Inventory } from '../obj/Inventory';
import { Item } from "../obj/Item";

/**
 * Operations related to Mix It Up Inventory data.
 */
export default class InventoryAPI extends BaseAPI {

  /**
   * Gets a list of all inventories available.
   */
  async getAllInventories(): Promise<Inventory[]> {
    let result = await WebRequest.get(`${this._baseAddress}/inventory`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * Gets a specific inventory.
   * @param id The inventory ID to query.
   */
  async getInventoryByID(id: string): Promise<Inventory> {
    let result = await WebRequest.get(`${this._baseAddress}/inventory/${id}`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new Inventory(), obj);
  }

  /**
   * This API can be used to add or subtract inventory items from a user.
   * @param inventoryID The inventory ID that needs to be adjusted.
   * @param userID The name or ID that needs to be adjusted.
   * @param item The item to adjust for user's inventory. The amount may be positive or negative.
   */
  async addInventoryItemToUser(inventoryID: string, userID: string, item: Item): Promise<User> {
    let result = await WebRequest.put(`${this._baseAddress}/users/${userID}/inventory/${inventoryID}/adjust`, {json: item});
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new User(), obj);
  }

}