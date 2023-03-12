import { Team } from '../domain/User';

export interface RegisterUserRequest {
  name: string;
  nickname: string;
  password: string;
  team: Team
}