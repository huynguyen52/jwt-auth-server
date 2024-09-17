import { Controller, Get, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import AccessTokenGuard from '../authentication/guards/access-token.guard';

@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(AccessTokenGuard)
  findAll() {
    return this.usersService.findAll();
  }
}
