import {UserRole} from './UserRole';

export class UserAction {
  constructor(
    public name: string,
    public icon: string,
    public rolesAllowed: UserRole[],
    public url: string
  ) {}
}
