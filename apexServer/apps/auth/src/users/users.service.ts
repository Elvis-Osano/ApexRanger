import {
  Injectable,
  UnauthorizedException,
  UnprocessableEntityException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";

import { CreateUserRequest } from "./dto/create-user.request";
import User from "./entities/user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>
  ) {}

  async createUser(request: CreateUserRequest) {
    await this.validateCreateUserRequest(request);
    const user = this.usersRepository.create({
      ...request,
      password: await bcrypt.hash(request.password, 10),
    });

    return await this.usersRepository.save(user);
  }

  private async validateCreateUserRequest(request: CreateUserRequest) {
    let user: User;
    try {
      user = await this.usersRepository.findOne({
        where: {
          email: request.email,
        },
      });
    } catch (err) {}

    if (user) {
      throw new UnprocessableEntityException("Email already exists.");
    }
  }

  async validateUser(email: string, password: string) {
    const user = await this.usersRepository.findOne({
      where: {
        email: email,
      },
    });

    if (user) {
      const passwordIsValid = await bcrypt.compare(password, user.password);
      if (!passwordIsValid) {
        throw new UnauthorizedException("Credentials are not valid.");
      }
      return user;
    }
  }

  async getUser(getUserArgs: Partial<User>) {
    return this.usersRepository.findOne({ where: { ...getUserArgs } });
  }
  async findAll() {
    return this.usersRepository.find({});
  }
}
