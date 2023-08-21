import { HttpException, HttpStatus, Injectable,BadRequestException} from '@nestjs/common';
import { User } from './entities/user.entity';
import { UserDTO } from './dtos/users.dto';
import { Tweet } from './entities/tweets.entity';
import { TweetDTO } from './dtos/tweets.dto';

@Injectable()
export class AppService {
  private users: User[];
  private tweets: Tweet[];

  constructor() {
    this.users = [];
    this.tweets = [];
  }

  getHealth(): string {
    return "I'm okay!";
  }

  async signUp(body: UserDTO) {
    const { username, avatar } = body;
    const existUser = this.users.find(
      (user: User) => user._username == username,
    );

    if (existUser) {
      throw new HttpException('username já existe, tente outro', HttpStatus.CONFLICT);
    }

    this.users.push(new User(username, avatar));
  }

  async postTweet(body: TweetDTO) {
    const { username, tweet } = body;
    const User = this.users.find(
      (user: User) => user._username == username,
    );
    
    return this.tweets.push(new Tweet(User, tweet));
  }

  getTweets(page: string) {
    const pagina = parseInt(page);
    if (pagina <= 0) {
      throw new BadRequestException();
    }

    if (pagina >= 1) {
      const pageInterval = 15;
      const limit: number = pageInterval * pagina;
      const offset: number = limit - pageInterval;
      const pagination = [...this.tweets]
        .reverse()
        .slice(offset, limit)
        .map((tweet: Tweet) => ({
          username: tweet._user._username,
          avatar: tweet._user._avatar,
          tweet: tweet._tweet,
        }));

      return pagination;
    }

    const tweets = this.tweets.slice(-15);
    const recentTweets = tweets.reverse().map((tweet: Tweet) => ({
      username: tweet._user._username,
      avatar: tweet._user._avatar,
      tweet: tweet._tweet,
    }));

    return recentTweets;
  }

  getTweetsByUser(usernameParam: string) {
    return this.tweets
      .filter((tweet: Tweet) => tweet._user._username == usernameParam)
      .map((tweet: Tweet) => ({
        username: tweet._user._username,
        avatar: tweet._user._avatar,
        tweet: tweet._tweet,
      }));
  }
}

