import { Inject, Service } from 'typedi';
import { UserRepository } from '../domain/UserRepository';
import { USER_REPOSITORY_TOKEN } from '../infraestructure/UserContainer';
import { StatusCodes } from 'http-status-codes';
import { ApiError } from '../../Shared/domain/ApiError';

@Service()
export class ReturnUserInfoService {
  static USER_NOT_FOUND = 'USER_NOT_FOUND'
  constructor(
    @Inject(USER_REPOSITORY_TOKEN)
    private readonly userRepository: UserRepository,
  ) {}

  async handle(nickname: string) {
    const user = await this.userRepository.findBy(nickname);
    if (!user) throw new ApiError(
      StatusCodes.NOT_FOUND,
      ReturnUserInfoService.USER_NOT_FOUND
    );

    return { name: user.name, nickname: user.nickname, team: user.team };
  }
}
