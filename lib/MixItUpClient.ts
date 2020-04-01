import UserAPI from './api/UserAPI';
import CurrencyAPI from './api/CurrencyAPI';
import ChatAPI from './api/ChatAPI';
import CommandsAPI from './api/CommandsAPI';
import InventoryAPI from './api/InventoryAPI';
import MixerAPI from './api/MixerAPI';
import MixPlayAPI from './api/MixPlayAPI';


export class MixItUpClient {

  /**
   * A group of User API methods.
   */
  get users(): UserAPI {
    return new UserAPI(this);
  }

  /**
   * A group of Currency API methods.
   */
  get currencies(): CurrencyAPI {
    return new CurrencyAPI(this);
  }

  /**
   * A group of Chat API methods.
   */
  get chat(): ChatAPI {
    return new ChatAPI(this);
  }

  /**
   * A group of Commands API methods.
   */
  get commands(): CommandsAPI {
    return new CommandsAPI(this);
  }

  /**
   * A group of Inventory API methods.
   */
  get inventories(): InventoryAPI {
    return new InventoryAPI(this);
  }

  /**
   * A group of Mixer API methods.
   */
  get mixer(): MixerAPI {
    return new MixerAPI(this);
  }

  /**
   * A group of MixPlay API methods.
   */
  get mixplay(): MixPlayAPI {
    return new MixPlayAPI(this);
  }
}

export default MixItUpClient;