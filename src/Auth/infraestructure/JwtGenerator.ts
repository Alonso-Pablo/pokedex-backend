import { UserIdentification } from '../domain/UserIdentification';
import { TokenStrategyGenerator } from '../domain/TokenStrategyGenerator';
import { JwtSignService } from '../application/JwtSignService';
import { Service } from 'typedi';

@Service()
export class JwtGenerator implements TokenStrategyGenerator {
  constructor(
    private readonly jwt: JwtSignService
  ) {}

  generateFrom(userIdentification: UserIdentification): string {
    return this.jwt.sign(userIdentification);
  }
}
