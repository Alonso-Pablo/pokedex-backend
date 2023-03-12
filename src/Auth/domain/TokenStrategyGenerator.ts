import { UserIdentification } from './UserIdentification';

export interface TokenStrategyGenerator {
  generateFrom(userIdentification: UserIdentification): string;
}