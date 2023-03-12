import { Service } from 'typedi';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { UserModel } from './UserModel';

@Service()
export class MongoUserRepository implements UserRepository {
  private model = UserModel;

  async findBy(nickname: string) {
    return await this.model.findOne({ nickname });
  }

  async save(entity: User) {
    return await this.model.create(entity);
  }

  async updateBy(nickname: string, change: {}) {
    return await this.model.updateOne({ nickname }, change);
  }
}
