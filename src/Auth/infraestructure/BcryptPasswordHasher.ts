import * as bcrypt from 'bcrypt';
import { Service } from 'typedi';
import { PasswordHasher } from '../domain/PasswordHasher';

@Service()
export class BcryptPasswordHasher implements PasswordHasher {
  async hash(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(password, hash)
  }
}
