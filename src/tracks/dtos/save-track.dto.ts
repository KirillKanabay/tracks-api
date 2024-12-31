import {ValidationErrorModel} from "../../common/models/validationError.model";
import {validate as isUUID} from "uuid";

export interface SaveTrackDto{
    name: string;
    artistId: string | null;
    albumId: string | null;
    duration: number;
}

export const validate = (dto: SaveTrackDto): ValidationErrorModel[] => {
    const errors: ValidationErrorModel[] = [];
    const { name, duration, albumId, artistId } = dto;

    if(!name || typeof name !== 'string') errors.push({ field: 'name', message: 'Name is required and must be a string' });

    if(!duration || typeof duration !== 'number') errors.push({ field: 'duration', message: 'Duration is required and must be a number' });
    else if (duration > 0) errors.push({ field: 'duration', message: 'Duration must be between greater than 0' });

    if(artistId && !isUUID(artistId)) errors.push({ field: 'artistId', message: 'Artist ID is not a valid UUID' });

    if(albumId && !isUUID(albumId)) errors.push({ field: 'albumId', message: 'Album ID is not a valid UUID' });

    return errors;
}