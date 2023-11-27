import * as maria from "mariadb";
import * as dotenv from "dotenv";

dotenv.config()

async () => {
    const conn = await maria.createConnection({user: "root", password: "1234",
    host: "localhost"});

    conn.

}
