import {AlbumEntity} from "./album.entity";
import {Album} from "../dataAccess/models/album.model";

export class AlbumRepository {
    async getAll(): Promise<AlbumEntity[]>{
        return Album.findAll();
    }
    get(id: string): Promise<AlbumEntity | null> {
        return Album.findByPk(id);
    }

    async add(entity: AlbumEntity): Promise<void> {
        await Album.create(entity);
    }

    async update(album: Album, updateFields: Partial<AlbumEntity>): Promise<void> {
        album.setAttributes(updateFields);
        if(album.changed()){
            await album.save();
        }
    }

    async delete(id: string): Promise<void> {
        await Album.destroy({where: {id}});
    }
}