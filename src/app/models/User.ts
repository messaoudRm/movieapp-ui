import {UserRole} from './UserRole';

export class User {
  constructor(
    public id: number,
    public username: string,
    public password: string,
    public email: string | null,
    public role: UserRole = 'USER',
  ) {}

  static fromJson(userJson: any): User {
    return new User(
      userJson.id,
      userJson.username ?? null,
      userJson.password ?? null,
      userJson.email ?? null,
      userJson.role ?? null
    );
  }
}
