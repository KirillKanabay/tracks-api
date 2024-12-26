import {ValidationErrorModel} from "../../common/models/validationError.model";

export interface SignupDto{
    login: string;
    password: string;
}

export const validate = (dto: SignupDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const {login, password} = dto;

    if(!login || typeof dto.login !== 'string') errors.push({ field: 'login', message: 'Login is required and must be a string' });
    if(!password || typeof dto.password !== 'string') errors.push({ field: 'password', message: 'Password is required and must be a string'});

    return errors;
};