import BaseAPI from "./BaseAPI";
import * as WebRequest from 'web-request';
import { User } from "../obj/User";

/**
 * Operations related to Mix It Up Chat.
 */
export default class ChatAPI extends BaseAPI {

  /**
   * Gets a list of all users currently active in chat.
   */
  async getAllChatUsers(): Promise<User[]> {
    let result = await WebRequest.get(`${this._baseAddress}/chat/users`);
    let obj = JSON.parse(result.content);

    if (obj.Message) {
      throw new Error(obj.Message);
    }

    return obj;
  }

  /**
   * Sends a message to the chat.
   * @param msg The message to send to chat.
   * @param sendAsStreamer True will force the message to send as the streamer. False will try to send as the registered bot, if available.
   */
  async sendChatMessage(msg: string, sendAsStreamer: boolean = false): Promise<void> {
    let result = await WebRequest.post(`${this._baseAddress}/chat/message`, { json: { Message: msg, SendAsStreamer: sendAsStreamer } });
    if (result.content) {
      let tmp = JSON.stringify(result.content);
      let obj = JSON.parse(tmp);

      if (obj.Message) {
        throw new Error(obj.Message);
      }
    }
  }

  /**
   * Sends a whisper to a user in chat.
   * @param userName The user to receive the whisper.
   * @param msg The message to send to chat.
   * @param sendAsStreamer True will force the whisper to send as the streamer. False will try to send as the registered bot, if available.
   */
  async sendWhisperMessage(userName: string, msg: string, sendAsStreamer: boolean = false): Promise<void> {
    let result = await WebRequest.post(`${this._baseAddress}/chat/whisper`, { json: { UserName: userName, Message: msg, SendAsStreamer: sendAsStreamer } });
    if (result.content) {
      let tmp = JSON.stringify(result.content);
      let obj = JSON.parse(tmp);

      if (obj.Message) {
        throw new Error(obj.Message);
      }
    }
  }

  /**
   * Clears the chat history.
   */
  async clearChat(): Promise<void> {
    let result = await WebRequest.delete(`${this._baseAddress}/chat/message`);
    if (result.content) {
      let tmp = JSON.stringify(result.content);
      let obj = JSON.parse(tmp);

      if (obj.Message) {
        throw new Error(obj.Message);
      }
    }
  }

}