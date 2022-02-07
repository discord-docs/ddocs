import { Intents } from "./intents";

export interface Identity {
  token: string;
  events: Intents;
  page: string;
}
