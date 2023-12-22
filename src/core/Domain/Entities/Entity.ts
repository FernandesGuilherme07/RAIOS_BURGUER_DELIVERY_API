import { randomUUID } from "crypto";
import { DomainNotifications } from "../DomainNotifications/DomainNotifications";

export default class Entity extends DomainNotifications {
  _id: string = randomUUID();

  get getProps() {
    return this;
  }
}