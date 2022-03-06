import mongodb from 'mongodb';
import DataSource from "../../types/DataSource";

export default class MongoDataSource implements DataSource {




    constructor() {
        const {
            DB_USER,
            DB_PASSWORD,
            DB_HOST,
            DB_PORT,
            DB_NAME,
        } = process.env;
        
        this.config = {
            url: `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`
        };
    }
}