import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { UserDTO } from './dtos/users.dto';
import { TweetDTO } from './dtos/tweets.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHealth(): string {
    return this.appService.getHealth();
  }

  @Post('sign-up')
  @HttpCode(HttpStatus.OK)
  signUp(@Body() body: UserDTO) {
    return this.appService.signUp(body);
  }

  @Post('tweets')
  postTweet(@Body() body: TweetDTO) {
    return this.appService.postTweet(body);
  }

  @Get('/tweets')
  getTweets(@Query('page') page: string) {
    return this.appService.getTweets(page);
  }

  @Get('/tweets/:username')
  getTweetsByUser(@Param('username') username: string) {
    return this.appService.getTweetsByUser(username);
  }
}