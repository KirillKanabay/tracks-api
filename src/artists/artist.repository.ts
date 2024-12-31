import {ArtistEntity} from "./artist.entity";
import {Artist} from "../dataAccess/models/artist.model";

export class ArtistRepository{
    async getAll(): Promise<ArtistEntity[]>{
        return Artist.findAll();
    }
    get(id: string): Promise<ArtistEntity | null> {
        return Artist.findByPk(id);
    }

    async add(entity: ArtistEntity): Promise<void> {
        await Artist.create(entity);
    }

    async update(artist: Artist, updateFields: Partial<ArtistEntity>): Promise<void> {
        artist.setAttributes(updateFields);
        if(artist.changed()){
            await artist.save();
        }
    }

    async delete(id: string): Promise<void> {
        await Artist.destroy({where: {id}});
    }
}