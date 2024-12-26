import {ValidationErrorModel} from "../../common/models/validationError.model";

export interface RefreshTokenDto{
    refreshToken: string;
}

export const validate = (dto: RefreshTokenDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const {refreshToken} = dto;
    console.log(refreshToken);
    if(!refreshToken || typeof refreshToken !== 'string') errors.push({
            field: 'refreshToken',
            message: 'Refresh token is required and must be a string'
    });

    return errors;
};