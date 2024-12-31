import {TrackRepository} from "./track.repository";
import {ExecutionResult} from "../common/models/executionResult.model";
import {logger} from "../common/services/logger.service";
import {ErrorCodes} from "../common/constants/errorCodes";
import {TrackEntity} from "./track.entity";
import {TrackDto} from "./dtos/track.dto";
import {SaveTrackDto} from "./dtos/save-track.dto";
import {ArtistRepository} from "../artists/artist.repository";
import {AlbumRepository} from "../albums/album.repository";
import {Track} from "../dataAccess/models/track.model";

export class TrackService{
    private readonly _trackRepository : TrackRepository;
    private readonly _artistRepository : ArtistRepository;
    private readonly _albumRepository : AlbumRepository;

    constructor() {
        this._trackRepository = new TrackRepository();
        this._artistRepository = new ArtistRepository();
        this._albumRepository = new AlbumRepository();
    }

    public async getAll(): Promise<ExecutionResult<TrackDto[]>>{
        try {
            return ExecutionResult.success(await this._trackRepository.getAll()
                .then(tracks => tracks.map(track => this.mapToDto(track))));
        } catch (e) {
            logger.error('Error while getting tracks', e);
            return ExecutionResult.fail('Error while getting tracks', ErrorCodes.INTERNAL);
        }
    }

    public async getById(id: string): Promise<ExecutionResult<TrackDto>>{
        try {
            const track = await this._trackRepository.get(id)
                .then(a => a ? this.mapToDto(a) : null);

            if(!track){
                return ExecutionResult.notFound('Track not found');
            }

            return ExecutionResult.success(track);
        } catch (e) {
            logger.error('Error while getting tracks', e);
            return ExecutionResult.fail('Error while getting tracks', ErrorCodes.INTERNAL);
        }
    }

    public async create(dto: SaveTrackDto): Promise<ExecutionResult<void>>{
        try {
            if(dto.albumId && !await this.isAlbumExists(dto.albumId)){
                return ExecutionResult.fail('Album not found', ErrorCodes.NOT_FOUND);
            }

            if(dto.artistId && !await this.isArtistExists(dto.artistId)){
                return ExecutionResult.fail('Artist not found', ErrorCodes.NOT_FOUND);
            }

            await this._trackRepository.add({
                name: dto.name,
                duration: dto.duration,
                artistId: dto.artistId,
                albumId: dto.albumId
            });

            return ExecutionResult.success();
        } catch (e){
            logger.error('Error while creating track', e);
            return ExecutionResult.fail('Error while creating track', ErrorCodes.INTERNAL);
        }
    }

    public async update(id:string, dto: SaveTrackDto): Promise<ExecutionResult<TrackDto>>{
        try {
            const existingTrack = await this._trackRepository.get(id);

            if(!existingTrack){
                return ExecutionResult.notFound('track not found');
            }

            if(dto.albumId && !await this.isAlbumExists(dto.albumId)){
                return ExecutionResult.fail('Album not found', ErrorCodes.NOT_FOUND);
            }

            if(dto.artistId && !await this.isArtistExists(dto.artistId)){
                return ExecutionResult.fail('Artist not found', ErrorCodes.NOT_FOUND);
            }

            await this._trackRepository.update(<Track>existingTrack, dto);

            return ExecutionResult.success(this.mapToDto(existingTrack));
        }catch (e){
            logger.error('Error while updating track', e);
            return ExecutionResult.fail('Error while updating track', ErrorCodes.INTERNAL);
        }
    }

    public async delete(id: string): Promise<ExecutionResult<void>>{
        try {
            const existingTrack = await this._trackRepository.get(id);

            if(!existingTrack){
                return ExecutionResult.notFound('track not found');
            }

            await this._trackRepository.delete(id);

            return ExecutionResult.success();
        }catch (e){
            logger.error('Error while deleting track', e);
            return ExecutionResult.fail('Error while deleting track', ErrorCodes.INTERNAL);
        }
    }

    private mapToDto(track: TrackEntity): TrackDto {
        return {
            id: track.id!,
            name: track.name,
            duration: track.duration,
            artistId: track.artistId,
            albumId: track.albumId
        }
    }

    private async isArtistExists(artistId: string): Promise<boolean> {
        let artist = await this._artistRepository.get(artistId);
        return !!artist;
    }

    private async isAlbumExists(albumId: string): Promise<boolean> {
        let album = await this._albumRepository.get(albumId);
        return !!album;
    }
}