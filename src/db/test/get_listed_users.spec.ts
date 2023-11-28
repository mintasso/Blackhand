import { assert } from "chai";
import * as dataenv from "dotenv"
import {connect} from "../connect";
import { DB } from "../class";


dataenv.config();


describe("Get listed users", () => {
    it("should return something", async () => {
        const conn = await connect();

        const db = new DB(conn);

        const listed_users = await db.getListedUsers();

        console.log("lu: ", listed_users)


        await conn.end();
        await conn.destroy();

        assert.isTrue(false)
    })
})

