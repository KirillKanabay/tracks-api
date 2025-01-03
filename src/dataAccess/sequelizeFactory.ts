import {Sequelize} from "sequelize";
import {DB_HOST, DB_NAME, DB_PASSWORD, DB_USER} from "../config";
import {User} from "./models/user.model";
import {Artist} from "./models/artist.model";
import { Album } from "./models/album.model";
import {Track} from "./models/track.model";

export const createSequelize = () => {
    const sequelize = new Sequelize({
        dialect: 'mysql',
        host: DB_HOST,
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD
    });

    User.initModel(sequelize);
    Artist.initModel(sequelize);
    Album.initModel(sequelize);
    Track.initModel(sequelize);

    Artist.associate();
    Album.associate();
    Track.associate();

    return sequelize;
};