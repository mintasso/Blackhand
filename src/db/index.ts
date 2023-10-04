import { DB } from './class.js';

const db = new DB();
const givenId = ["1154858064722272277", "864605650020597770", "1154858064722272277", "1154859541503152318"]
const guild_id = "1154857944744210484"
db.CheckIfUserBlacklisted(givenId)
db.get_server_settings(guild_id)


