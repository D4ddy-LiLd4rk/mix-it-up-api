import { Currency } from "./Currency";
import { Inventory } from './Inventory';

export class User {

  ID!: number;
  UserName!: string;
  ViewingMinutes!: number;
  CurrencyAmounts!: Currency[];
  InventoryAmounts!: Inventory[];
}