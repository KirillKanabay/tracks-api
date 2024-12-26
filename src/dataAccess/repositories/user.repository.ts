
import {UserEntity} from "../entities/user.entity";
import {User} from "../models/user.model";

export class UserRepository{
    async get(id: string): Promise<UserEntity | null> {
        return User.findByPk(id);
    }

    async getByLogin(login: string): Promise<UserEntity | null> {
        return User.findOne({where: {login}});
    }

    async add(entity: UserEntity): Promise<void> {
        await User.create(entity);
    }

    async update(entity: UserEntity): Promise<void> {
        const user = User.build(entity);
        await user.save();
    }

    async delete(id: string): Promise<void> {
        await User.destroy({where: {id}});
    }
}