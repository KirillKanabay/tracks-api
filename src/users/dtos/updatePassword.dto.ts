import {ValidationErrorModel} from "../../common/models/validationError.model";

export interface UpdatePasswordDto{
    oldPassword: string;
    newPassword: string;
}

export const validate = (dto: UpdatePasswordDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const {oldPassword, newPassword} = dto;

    if(!oldPassword || typeof oldPassword !== 'string') errors.push({ field: 'oldPassword', message: 'Password is required and must be a string' });
    if(!newPassword || typeof newPassword !== 'string') errors.push({ field: 'newPassword', message: 'Password is required and must be a string' });

    return errors;
};