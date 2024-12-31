import {ArtistRepository} from "./artist.repository";
import {ExecutionResult} from "../common/models/executionResult.model";
import {ArtistDto} from "./dtos/artist.dto";
import {logger} from "../common/services/logger.service";
import {ErrorCodes} from "../common/constants/errorCodes";
import {ArtistEntity} from "./artist.entity";
import {SaveArtistDto} from "./dtos/save-artist.dto";
import {Artist} from "../dataAccess/models/artist.model";

export class ArtistService{
    private readonly _artistRepository: ArtistRepository;

    constructor() {
        this._artistRepository = new ArtistRepository();
    }

    public async getAll(): Promise<ExecutionResult<ArtistDto[]>>{
        try {
            return ExecutionResult.success(await this._artistRepository.getAll()
                .then(artists => artists.map(artist => this.mapToDto(artist))));
        } catch (e) {
            logger.error('Error while getting artists', e);
            return ExecutionResult.fail('Error while getting artists', ErrorCodes.INTERNAL);
        }
    }

    public async getById(id: string): Promise<ExecutionResult<ArtistDto>>{
        try {
            const artist = await this._artistRepository.get(id)
                .then(a => a ? this.mapToDto(a) : null);

            if(!artist){
                return ExecutionResult.notFound('Artist not found');
            }

            return ExecutionResult.success(artist);
        } catch (e) {
            logger.error('Error while getting artists', e);
            return ExecutionResult.fail('Error while getting artists', ErrorCodes.INTERNAL);
        }
    }

    public async create(dto: SaveArtistDto): Promise<ExecutionResult<void>>{
        try {
            await this._artistRepository.add({
                name: dto.name,
                grammy: dto.grammy
            });

            return ExecutionResult.success();
        } catch (e){
            logger.error('Error while creating artist', e);
            return ExecutionResult.fail('Error while creating artist', ErrorCodes.INTERNAL);
        }
    }

    public async update(id:string, dto: SaveArtistDto): Promise<ExecutionResult<ArtistDto>>{
        try {
            const existingArtist = await this._artistRepository.get(id);

            if(!existingArtist){
                return ExecutionResult.notFound('Artist not found');
            }

            await this._artistRepository.update(<Artist>existingArtist, dto);

            return ExecutionResult.success(this.mapToDto(existingArtist));
        }catch (e){
            logger.error('Error while updating artist', e);
            return ExecutionResult.fail('Error while updating artist', ErrorCodes.INTERNAL);
        }
    }

    public async delete(id: string): Promise<ExecutionResult<void>>{
        try {
            const existingArtist = await this._artistRepository.get(id);

            if(!existingArtist){
                return ExecutionResult.notFound('Artist not found');
            }

            await this._artistRepository.delete(id);

            return ExecutionResult.success();
        }catch (e){
            logger.error('Error while deleting artist', e);
            return ExecutionResult.fail('Error while deleting artist', ErrorCodes.INTERNAL);
        }
    }

    private mapToDto(artist: ArtistEntity): ArtistDto {
        return {
            id: artist.id!,
            name: artist.name,
            grammy: artist.grammy,
            version: artist.version!
        }
    }
}