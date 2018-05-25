import {Role} from '../model/Role';

export abstract class Roles {
  public static readonly ADMIN: Role = new Role(1, 'ROLE_ADMIN');
  public static readonly VALIDATED_ORGANIZER: Role = new Role(2, 'ROLE_VALIDATED_ORGANIZER');
  public static readonly PENDING_ORGANIZER: Role = new Role(3, 'ROLE_PENDING_ORGANIZER');
  public static readonly VALIDATED_USER: Role = new Role(4, 'ROLE_VALIDATED_USER');
  public static readonly PENDING_USER: Role = new Role(5, 'ROLE_PENDING_USER');
}
