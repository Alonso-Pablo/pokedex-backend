export type Team = 'red' | 'yellow' | 'blue';

export class User {
  _id?: string | null;
  name: string;
  nickname: string;
  password: string;
  team: Team;
  lastConnection: Date = new Date()

  constructor(user: Omit<User, 'lastConnection'>) {
    this.name = user.name,
    this.nickname = user.nickname,
    this.password = user.password,
    this.team = user.team
  }
}
