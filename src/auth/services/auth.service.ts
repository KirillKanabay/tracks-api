import {UserRepository} from "../../users/repositories/user.repository";
import {ExecutionResult} from "../../common/models/executionResult.model";
import {ErrorCodes} from "../../common/constants/errorCodes";
import {logger} from "../../common/services/logger.service";
import * as jwt from "../../common/utils/jwt.utils";
import * as hash from "../../common/utils/hash.utils";
import {TokensDto} from "../dtos/tokens.dto";

export class AuthService{
    private readonly _userRepository: UserRepository;

    constructor() {
        this._userRepository = new UserRepository();
    }

    public async login(login: string, password: string): Promise<ExecutionResult<TokensDto>>{
        const existingUser = await this._userRepository.getByLogin(login);

        if (!existingUser || !await hash.comparePasswords(password, existingUser.password)){
            return ExecutionResult.fail('Invalid login or password', ErrorCodes.Auth.INVALID_CREDENTIALS);
        }

        return this.generateToken({login: existingUser.login, userId: existingUser.id!});
    }

    public async signup(login: string, password: string): Promise<ExecutionResult<void>>{
        const existingUser = await this._userRepository.getByLogin(login);

        if(existingUser){
            return ExecutionResult.fail('User with received login already exists', ErrorCodes.User.ALREADY_EXISTS);
        }
        try {
            await this._userRepository.add({
                login,
                password: await hash.hashPassword(password)
            });
        } catch (e){
            logger.error('Error while creating user', e);
            return ExecutionResult.fail('Error while creating user');
        }

        return ExecutionResult.success();
    }

    public async refresh(userId: string, refreshToken: string): Promise<ExecutionResult<TokensDto>>{
        const existingUser = await this._userRepository.get(userId);
        const tokenPayload = jwt.parseToken('refresh', refreshToken);

        if(!existingUser ||
            !tokenPayload ||
            !existingUser.refreshToken ||
            !hash.compareSHA256Hash(refreshToken, existingUser.refreshToken)){
            return ExecutionResult.fail('Invalid token', ErrorCodes.Auth.INVALID_REFRESH_TOKEN);
        }

        return this.generateToken({login: existingUser.login, userId: existingUser.id!});
    }


    private async generateToken(user: {login: string, userId: string}): Promise<ExecutionResult<TokensDto>> {
        const accessToken = jwt.generateToken('access', user);
        const refreshToken = jwt.generateToken('refresh', {});

        try {
            await this._userRepository.updateRefreshToken(user.login, hash.hashSHA256(refreshToken));
            return ExecutionResult.success({accessToken, refreshToken});
        } catch (e){
            logger.error('Error while updating refresh token', e);
            return ExecutionResult.fail('Error while generating refresh token', ErrorCodes.INTERNAL);
        }
    }
}