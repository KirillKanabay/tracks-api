import {ValidationErrorModel} from "../../common/models/validationError.model";
import {validate as isUUID} from 'uuid';

export interface SaveAlbumDto{
    name: string;
    year: number;
    artistId: string | null;
}

export const validate = (dto: SaveAlbumDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const { name, year, artistId } = dto;

    if(!name || typeof name !== 'string') errors.push({ field: 'name', message: 'Name is required and must be a string' });

    if(!year || typeof year !== 'number') errors.push({ field: 'year', message: 'Year is required and must be a number' });
    else if (year < 1900 || year > 2100) errors.push({ field: 'year', message: 'Year must be between 1900 and 2100' });

    if(artistId && !isUUID(artistId)) errors.push({ field: 'artistId', message: 'Artist ID is not a valid UUID' });

    return errors;
}