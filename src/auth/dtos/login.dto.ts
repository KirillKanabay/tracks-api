import {ValidationErrorModel} from "../../common/models/validationError.model";

export interface LoginDto{
    login: string;
    password: string;
}

export const validate = (dto: LoginDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const {login, password} = dto;

    if(!login || typeof login !== 'string') errors.push({ field: 'login', message: 'Login is required and must be a string' });
    if(!password || typeof password !== 'string') errors.push({ field: 'password', message: 'Password is required and must be a string'});

    return errors;
};