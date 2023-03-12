import { Inject, Service } from 'typedi';
import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';
import { PASSWORD_HASHER_TOKEN, TOKEN_STRATEGY_GENERATOR_TOKEN, USER_REPOSITORY_TOKEN } from '../infraestructure/UserContainer';
import { ApiError } from '../../Shared/domain/ApiError';
import { StatusCodes } from 'http-status-codes';
import { PasswordHasher } from '../../Auth/domain/PasswordHasher';
import { TokenStrategyGenerator } from '../../Auth/domain/TokenStrategyGenerator';

@Service()
export class RegisterUserService {
  static BAD_CREDENTIALS = 'USER_ALREADY_EXIST';
  constructor(
    @Inject(PASSWORD_HASHER_TOKEN)
    private readonly hasherPassword: PasswordHasher,
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
    @Inject(TOKEN_STRATEGY_GENERATOR_TOKEN)
    private readonly jwtGenerator: TokenStrategyGenerator,
  ) {}

  async handle({ name, nickname, password, team }: Omit<User, 'lastConnection'>): Promise<string> {
    await this.ensureThatNotAlreadyExistUserWithSame(nickname);
    const passwordHashed = await this.hasherPassword.hash(password);
    const newUser = new User({ name, nickname, password: passwordHashed, team });
    const userSaved = await this.userRepository.save(newUser);

    return this.jwtGenerator.generateFrom({
      id: userSaved._id!.toString(),
      nickname: userSaved.nickname
    });
  }

  private async ensureThatNotAlreadyExistUserWithSame(nickname: string): Promise<void> {
    const user = await this.userRepository.findBy(nickname)
    if (user) throw new ApiError(StatusCodes.CONFLICT, RegisterUserService.BAD_CREDENTIALS)
  }
}
