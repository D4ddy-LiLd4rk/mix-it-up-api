import BaseAPI from "./BaseAPI";
import * as WebRequest from 'web-request';
import { Command } from "../obj/Command";

/**
 * Operations related to Mix It Up Commands.
 */
export default class CommandsAPI extends BaseAPI {

  /**
   * Gets a list of all commands available.
   */
  async getAllCommands(): Promise<Command[]> {
    let result = await WebRequest.get(`${this._baseAddress}/commands`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * Gets the requested command.
   * @param id The command ID to query.
   */
  async getCommandByID(id: string): Promise<Command> {
    let result = await WebRequest.get(`${this._baseAddress}/commands/${id}`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new Command(), obj);
  }

  /**
   * Used to run the requested command.
   * @param id The command ID to query.
   * @param args Array of string arguments.
   */
  async runCommandByID(id: string, args?: string[]): Promise<Command> {
    let result = await WebRequest.post(`${this._baseAddress}/commands/${id}`, {json: args})
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new Command(), obj);
  }

  /**
   * Used to enable or disable the requested command.
   * @param id The command ID to query.
   * @param enable True if enabled, false otherwise.
   */
  async enableDisableCommand(id: string, enable: boolean = true): Promise<Command> {
    let command: Command = await this.getCommandByID(id);
    command.IsEnabled = enable;
    
    let result = await WebRequest.put(`${this._baseAddress}/commands/${id}`, {json: command});
    let tmp = JSON.stringify(result.content);
    let obj = JSON.parse(tmp);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return Object.assign(new Command(), obj);
  }

}