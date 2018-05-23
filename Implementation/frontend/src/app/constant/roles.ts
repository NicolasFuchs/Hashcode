import {Role} from '../model/Role';

export abstract class Roles {
  public static readonly PENDING_ORGANIZER: Role = new Role(3, 'ROLE_PENDING_ORGANIZER');
  public static readonly PENDING_USER: Role = new Role(5, 'ROLE_PENDING_USER');
}
