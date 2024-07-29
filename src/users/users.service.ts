import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>
    ) { }

    findOne(email: string): Promise<User | undefined> {
        return this.userRepository.findOneBy({ email });
    }

    async create(user: Partial<User>): Promise<User> {
        const newUser = this.userRepository.create(user);
        await this.userRepository.save(newUser);
        return newUser;
    }
}
