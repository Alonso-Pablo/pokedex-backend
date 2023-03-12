import { Service } from 'typedi';
import { sign, SignOptions } from 'jsonwebtoken'
import { UserIdentification } from '../domain/UserIdentification';

@Service()
export class JwtSignService {
  sign({ id, nickname }: UserIdentification, options?: SignOptions ): string {
    const secret = process.env.TOKEN_SECRET as string;
    return sign({ sub: id, nickname }, secret, options)
  }
}