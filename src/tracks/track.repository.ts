import { Track } from "../dataAccess/models/track.model";
import {TrackEntity} from "./track.entity";

export class TrackRepository {
    async getAll(): Promise<TrackEntity[]>{
        return Track.findAll();
    }
    get(id: string): Promise<TrackEntity | null> {
        return Track.findByPk(id);
    }

    async add(entity: TrackEntity): Promise<void> {
        await Track.create(entity);
    }

    async update(track: Track, updateFields: Partial<TrackEntity>): Promise<void> {
        track.setAttributes(updateFields);
        if(track.changed()){
            await track.save();
        }
    }

    async delete(id: string): Promise<void> {
        await Track.destroy({where: {id}});
    }
}