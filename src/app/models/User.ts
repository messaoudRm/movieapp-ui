import {UserRole} from './UserRole';

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string | null,
    public role: UserRole = 'USER',
  ) {}
}
