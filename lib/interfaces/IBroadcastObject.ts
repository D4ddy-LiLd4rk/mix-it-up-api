import { MixPlayScopes } from '../enum/MixPlayScopes';

/**
 * The data to broadcast and related scopes.
 */
export interface IBroadcastObject {
  /**
   * The list of scopes. For example: everyone, group:id, scene:id, participant:uuid
   */
  Scopes?: MixPlayScopes[],
  /**
   * Any JSON data you want to send.
   */
  Data?: Object
}