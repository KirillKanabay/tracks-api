import {UserRepository} from "../dataAccess/repositories/user.repository";
import {ExecutionResult} from "../models/executionResult.model";
import {ErrorCodes} from "../constants/errorCodes";
import {logger} from "./logger.service";
import {UserEntity} from "../dataAccess/entities/user.entity";
import {generateToken} from "../utils/jwt.utils";
import {ACCESS_TOKEN_LIFETIME } from "../config";
import {comparePasswords, hashPassword} from "../utils/hash.utils";

export class AuthService{
    private readonly _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    public async login(login: string, password: string) : Promise<ExecutionResult<string>>{
        const existingUser = await this._userRepository.getByLogin(login);

        if (!existingUser || !await comparePasswords(password, existingUser.password)){
            return ExecutionResult.fail('Invalid login or password', ErrorCodes.Auth.INVALID_PASSWORD);
        }

        return ExecutionResult.success(this.generateToken(existingUser));
    }

    public async signup(login: string, password: string) : Promise<ExecutionResult<void>>{
        const existingUser = await this._userRepository.getByLogin(login);

        if(existingUser){
            return ExecutionResult.fail('User with received login already exists', ErrorCodes.User.ALREADY_EXISTS);
        }
        try {
            await this._userRepository.add({
                login,
                password: await hashPassword(password)
            });
        } catch (e){
            logger.error('Error while creating user', e);
            return ExecutionResult.fail('Error while creating user');
        }

        return ExecutionResult.success();
    }

    public async refresh(userId: string, refreshToken: string){

    }

    private generateToken(user: UserEntity){
        return generateToken({
            userId: user.id,
            login: user.login
        }, ACCESS_TOKEN_LIFETIME)
    }
}