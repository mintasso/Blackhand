import {assert} from "chai";
import * as mariadb from "mariadb";
import * as dataenv from "dotenv"
import {connect} from "../connect";

dataenv.config();


describe("DB connection test", () => {
    it("should return true", async () => {
        try {
            const conn = await connect();



            await conn.end();
            await conn.destroy();


            assert.isTrue(true, "connected successfully");
        }
        catch(err: any) {
            assert.isTrue(false, "an error has occurred " + err.code);
        }
    });

})