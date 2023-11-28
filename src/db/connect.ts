import * as mariadb from "mariadb";


export async function connect() {
    const conn = await mariadb.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
    })

    return conn;
}


export async function create_pool() {
    const conn = await mariadb.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DATABASE,
        connectionLimit: Number(process.env.CONNECTION_LIMIT),
    })

    return conn;
}


