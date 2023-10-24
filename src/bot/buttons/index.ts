import { ButtonInteraction, Client, Collection } from "discord.js";
import { warn_at, ban_at } from "./settings";

type Executable = (client: Client, interaction: ButtonInteraction) => void

const collection = new Collection<string, Executable>();

collection.set(warn_at.name, warn_at.executable);
collection.set(ban_at.name, ban_at.executable);


export {collection as button_collection, Executable}