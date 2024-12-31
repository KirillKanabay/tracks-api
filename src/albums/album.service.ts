import {AlbumRepository} from "./album.repository";
import {ExecutionResult} from "../common/models/executionResult.model";
import {logger} from "../common/services/logger.service";
import {ErrorCodes} from "../common/constants/errorCodes";
import {AlbumEntity} from "./album.entity";
import {AlbumDto} from "./dtos/album.dto";
import {SaveAlbumDto} from "./dtos/save-album.dto";
import {Album} from "../dataAccess/models/album.model";
import {ArtistRepository} from "../artists/artist.repository";

export class AlbumService {
    private readonly _albumRepository: AlbumRepository;
    private readonly _artistRepository: ArtistRepository;

    constructor() {
        this._albumRepository = new AlbumRepository();
        this._artistRepository = new ArtistRepository();
    }

    public async getAll(): Promise<ExecutionResult<AlbumDto[]>>{
        try {
            return ExecutionResult.success(await this._albumRepository.getAll()
                .then(albums => albums.map(album => this.mapToDto(album))));
        } catch (e) {
            logger.error('Error while getting albums', e);
            return ExecutionResult.fail('Error while getting albums', ErrorCodes.INTERNAL);
        }
    }

    public async getById(id: string): Promise<ExecutionResult<AlbumDto>>{
        try {
            const album = await this._albumRepository.get(id)
                .then(a => a ? this.mapToDto(a) : null);

            if(!album){
                return ExecutionResult.notFound('Album not found');
            }

            return ExecutionResult.success(album);
        } catch (e) {
            logger.error('Error while getting albums', e);
            return ExecutionResult.fail('Error while getting albums', ErrorCodes.INTERNAL);
        }
    }

    public async create(dto: SaveAlbumDto): Promise<ExecutionResult<void>>{
        try {
            if(dto.artistId && !await this.isArtistExists(dto.artistId)){
                return ExecutionResult.notFound('Artist not found');
            }

            await this._albumRepository.add({
                name: dto.name,
                year: dto.year,
                artistId: dto.artistId
            });

            return ExecutionResult.success();
        } catch (e){
            logger.error('Error while creating album', e);
            return ExecutionResult.fail('Error while creating album', ErrorCodes.INTERNAL);
        }
    }

    public async update(id:string, dto: SaveAlbumDto): Promise<ExecutionResult<AlbumDto>>{
        try {
            const existingAlbum = await this._albumRepository.get(id);

            if(!existingAlbum){
                return ExecutionResult.notFound('Album not found');
            }

            if(dto.artistId && !await this.isArtistExists(dto.artistId)){
                return ExecutionResult.notFound('Artist not found');
            }

            await this._albumRepository.update(<Album>existingAlbum, dto);

            return ExecutionResult.success(this.mapToDto(existingAlbum));
        }catch (e){
            logger.error('Error while updating album', e);
            return ExecutionResult.fail('Error while updating album', ErrorCodes.INTERNAL);
        }
    }

    public async delete(id: string): Promise<ExecutionResult<void>>{
        try {
            const existingAlbum = await this._albumRepository.get(id);

            if(!existingAlbum){
                return ExecutionResult.notFound('Album not found');
            }

            await this._albumRepository.delete(id);

            return ExecutionResult.success();
        }catch (e){
            logger.error('Error while deleting album', e);
            return ExecutionResult.fail('Error while deleting album', ErrorCodes.INTERNAL);
        }
    }

    private mapToDto(album: AlbumEntity): AlbumDto {
        return {
            id: album.id!,
            name: album.name,
            year: album.year,
            artistId: album.artistId
        }
    }

    private isArtistExists(artistId: string): Promise<boolean>{
        return this._artistRepository.get(artistId)
            .then(artist => !!artist);
    }
}