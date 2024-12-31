import {ValidationErrorModel} from "../../common/models/validationError.model";

export interface SaveArtistDto {
    name: string;
    grammy: boolean;
}

export const validate = (dto: SaveArtistDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const { name, grammy } = dto;

    if(!name || typeof name !== 'string') errors.push({ field: 'name', message: 'Name is required and must be a string' });
    if(grammy === undefined || typeof grammy !== 'boolean') errors.push({ field: 'grammy', message: 'Grammy is required and must be a boolean' });

    return errors;
}