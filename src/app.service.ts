import { 
  HttpException, 
  HttpStatus, 
  Injectable,} from '@nestjs/common';
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

}

