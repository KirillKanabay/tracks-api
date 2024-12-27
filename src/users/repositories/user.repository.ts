
import {UserEntity} from "../entities/user.entity";
import {User} from "../../dataAccess/models/user.model";

export class UserRepository{
    async getAll(): Promise<UserEntity[]> {
        return User.findAll();
    }

    async get(id: string): Promise<UserEntity | null> {
        return User.findByPk(id);
    }

    async getByLogin(login: string): Promise<UserEntity | null> {
        return User.findOne({where: {login}});
    }

    async add(entity: UserEntity): Promise<void> {
        await User.create(entity);
    }

    async update(id: string, entity: Partial<UserEntity>): Promise<void> {
        await User.update(entity, {where: {id}})
    }

    async updateRefreshToken(login: string, refreshToken: string){
        await User.update({ refreshToken }, {where: {login}});
    }

    async delete(id: string): Promise<void> {
        await User.destroy({where: {id}});
    }
}