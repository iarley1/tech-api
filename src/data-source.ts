import "dotenv/config"
import { DataSource, DataSourceOptions } from "typeorm";
import path from "path";

const dataSourceconfig = (): DataSourceOptions => {
    const entitiesPath: string = path.join(__dirname, './entities/**.{ts,js}')
    const migrationsPath: string = path.join(__dirname, './migrations/**.{ts,js}')

    const nodeEnv: string | undefined = process.env.NODE_ENV
    const dbUrl: string | undefined = process.env.DATABASE_URL

    if(!dbUrl){
        throw new Error ("Missing env var: 'DATABASE_URL'")
    }

    if(nodeEnv === "test"){
        return {
            type: "sqlite",
            database: ":memory:",
            synchronize: true,
            entities: [entitiesPath]
        }
    }

    return {
        type: "postgres",
        url: dbUrl,
        synchronize: false,
        logging: true,
        entities: [entitiesPath],
        migrations: [migrationsPath]
    }
}

export const AppDataSource: DataSource = new DataSource(dataSourceconfig())