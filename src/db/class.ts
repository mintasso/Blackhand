import * as mariadb from "mariadb";

export class DB {
    public conn: mariadb.Pool | mariadb.Connection;

    constructor(pool: mariadb.Pool | mariadb.Connection) {
        this.conn = pool;
    }

    async getListedUsers() {
        const response = this.conn.query(`SELECT u.*, t.*, i.* FROM listed_users u 
        INNER JOIN listed_users_tags t 
        ON u.content_id = t.id 
        INNER JOIN listed_users_images i 
        ON u.content_id = i.id`);


        return response;
    }
}


