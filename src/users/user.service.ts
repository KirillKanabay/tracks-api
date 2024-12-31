import {UserRepository} from "./user.repository";
import {UserDto} from "./dtos/user.dto";
import {logger} from "../common/services/logger.service";
import {ExecutionResult} from "../common/models/executionResult.model";
import {ErrorCodes} from "../common/constants/errorCodes";
import {UserEntity} from "./user.entity";
import * as hash from "../common/utils/hash.utils";

export class UserService{
    private readonly _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    public async getAll(): Promise<ExecutionResult<UserDto[]>>{
        try {
            return ExecutionResult.success(await this._userRepository.getAll()
                .then(users => users.map(this.mapToDto)));
        } catch(e) {
            logger.error('Error while getting users', e);
            return ExecutionResult.fail('Error while getting users', ErrorCodes.INTERNAL);
        }
    }

    public async getById(id: string): Promise<ExecutionResult<UserDto>>{
        try {
            const user = await this._userRepository.get(id)
                .then(u => u ? this.mapToDto(u) : null);

            if (!user){
                return ExecutionResult.notFound('User not found');
            }

            return ExecutionResult.success(user);
        } catch(e) {
            logger.error('Error while getting user', e);
            return ExecutionResult.fail('Error while getting user', ErrorCodes.INTERNAL);
        }
    }

    public async updatePassword(id: string, oldPassword: string, newPassword: string): Promise<ExecutionResult<void>>{
        try {
            const user = await this._userRepository.get(id);
            if(!user){
                return ExecutionResult.notFound('User not found');
            }

            if(!await hash.comparePasswords(oldPassword, user.password)){
                return ExecutionResult.fail('Invalid old password', ErrorCodes.Auth.INVALID_CREDENTIALS);
            }

            await this._userRepository.update(id, {password: await hash.hashPassword(newPassword)});

            return ExecutionResult.success();
        } catch(e) {
            logger.error('Error while updating user password', e);
            return ExecutionResult.fail('Error while updating user password', ErrorCodes.INTERNAL);
        }
    }

    public async delete(id: string): Promise<ExecutionResult<void>>{
        try {
            const user = await this._userRepository.get(id);
            if(!user){
                return ExecutionResult.notFound('User not found');
            }

            await this._userRepository.delete(id);

            return ExecutionResult.success();
        } catch (e){
            logger.error('Error while deleting user', e);
            return ExecutionResult.fail('Error while deleting user', ErrorCodes.INTERNAL);
        }
    }

    private mapToDto(user: UserEntity): UserDto{
        return {
            id: user.id!,
            login: user.login,
            version: user.version!,
        }
    }
}