import { User } from './User';

export interface UserRepository {
  save(user: User): any;
  findBy(nickname: string): any;
  updateBy(nickname: string, change: {}): any;
}
