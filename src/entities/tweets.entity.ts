import { User } from './user.entity';

export class Tweet {
  private user: User;
  private tweet: string;

  constructor(user: User, tweet: string) {
    this.user = user;
    this.tweet = tweet;
  }

  get _user() {
    return this.user;
  }
  get _tweet() {
    return this.tweet;
  }
}