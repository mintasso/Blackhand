import { serverSettings, ListedUser } from "./interfaces";
import * as fs from "fs";
import * as path from "path";
import * as prettier from "prettier";
const settingsfile = path.join(__dirname, "settings.json");
const blacklistfile = path.join(__dirname, "blacklist.json");

async function readFile(whichfile: string) {
  try {
    if (!(whichfile === "settingsfile" || "blacklistfile")) {
      console.error("Wrong type of file to check given.");
      process.exit(1);
    }
    if (
      !fs.existsSync(whichfile) ||
      fs.readFileSync(whichfile, "utf-8").length === 0
    ) {
      console.log(
        whichfile,
        " doesn't exist or is empty. Creating a new document."
      );
      fs.writeFileSync(whichfile, JSON.stringify([]), "utf-8");
      return [];
    }
    return JSON.parse(fs.readFileSync(whichfile, "utf-8"));
  } catch (err) {
    console.error("Error: ", err);
    process.exit(1);
  }
}

async function writeFile(whichfile: string, newdata: any) {
  try {
    const data = await prettier.format(
      JSON.stringify((await readFile(whichfile)).concat(newdata)),
      { parser: "json" }
    );

    fs.writeFileSync(whichfile, data, "utf-8");
  } catch (err) {
    console.error("Error writing to file: ", err);
    process.exit(1);
  }
}

export class DB {
  constructor() {}

  async CheckIfUserBlacklisted(IDsToCheck: string[]): Promise<ListedUser[]> {
    try {
      const blacklist: ListedUser[] = await readFile(blacklistfile); // Corrected this line
      return blacklist.filter((user) => IDsToCheck.includes(user.user_id));
    } catch (error) {
      console.error("Error scanning for users", error);
      process.exit(1);
    }
  }

  async add_report(listedUser: ListedUser) {
    try {
      await writeFile(blacklistfile, listedUser);
      return;
    } catch (err) {
      console.error("An error occurred.", err);
      process.exit(1);
    }
  }

  async get_server_settings(guild_id: string): Promise<serverSettings> {
    const defaultSettings: serverSettings = {
      guildid: guild_id,
      warn_at: 3,
      ban_at: 7,
      autoban: true,
    };

    try {
      const jsonParsed = await readFile(settingsfile);
      const matchingSettings = jsonParsed.find(
        (settings: serverSettings) => settings.guildid === guild_id
      );

      if (!matchingSettings) {
        console.log(
          `No settings found for guild ID ${guild_id}. Creating an entry with default settings...`
        );

        jsonParsed.push(defaultSettings);
        await writeFile(settingsfile, jsonParsed);

        return defaultSettings;
      } else {
        return matchingSettings;
      }
    } catch (error) {
      console.error("Error reading the JSON file for settings.", error); // Added the error object to the log
      process.exit(1);
    }
  }

  async change_server_settings(
    guild_id: string,
    warn_at: number,
    ban_at: number,
    autoban: boolean
  ) {
    // add prompt to verify the changes by showing old and new configs
  }

  // delete_user(id: string) {
}
