import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findOne(email: string): Promise<User | undefined>;
    create(user: Partial<User>): Promise<User>;
}
