import { Inject, Service } from 'typedi';
import { PasswordHasher } from '../../Auth/domain/PasswordHasher';
import { TokenStrategyGenerator } from '../../Auth/domain/TokenStrategyGenerator';
import { ApiError } from '../../Shared/domain/ApiError';
import { UserRepository } from '../domain/UserRepository';
import {
  PASSWORD_HASHER_TOKEN,
  TOKEN_STRATEGY_GENERATOR_TOKEN,
  USER_REPOSITORY_TOKEN,
} from '../infraestructure/UserContainer';
import { StatusCodes } from 'http-status-codes';
import { User } from '../domain/User';

@Service()
export class LoginUserService {
  static BAD_CREDENTIALS = 'BAD_CREDENTIALS'
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly hasherPassword: PasswordHasher,
    @Inject(TOKEN_STRATEGY_GENERATOR_TOKEN)
    private readonly jwtGenerator: TokenStrategyGenerator
  ) {}

  async handle({ nickname, password }: { nickname: User['nickname'], password: User['password'] }) {
    const user = await this.userRepository.findBy(nickname) as User;
    if (!user) throw new ApiError(StatusCodes.NOT_FOUND, LoginUserService.BAD_CREDENTIALS);

    await this.ensureThatIsAValidPassword(password, user.password);

    await this.updateLastConnectionOfUser(nickname);

    return this.jwtGenerator.generateFrom({id: user.toString(), nickname: user.nickname });
  }

  private async updateLastConnectionOfUser(nickname: string) {
    await this.userRepository.updateBy(nickname, { lastConnection: new Date() })
  }

  private async ensureThatIsAValidPassword(password: string, hashedPassword: string) {
    const isAValidPassword = await this.hasherPassword.compare(
      password,
      hashedPassword
    );

    if (!isAValidPassword) throw new ApiError(StatusCodes.NOT_FOUND, LoginUserService.BAD_CREDENTIALS);
  }
}