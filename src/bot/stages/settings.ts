import { Attachment, Client, Interaction, Message } from "discord.js";
import { CurrentStatement } from "./current_statement";
import {writeFile} from "fs"
import { FileOrganizer } from "../get_file";
import { image_types_list } from "../variables";
import { send_message_in_pv } from "../helper";
import {get} from "https";
import { DataObject, get_page_data } from "../https_helper";


async function get_json_object(url: string) {
    const data_obj: DataObject = {data: ""};
    await get_page_data(url, data_obj);

    return JSON.parse(data_obj.data)

}

async function warn_at_stage(client: Client, i: Message, statement: CurrentStatement) {
    switch(statement.current_position[1]) {
        case 0:
            if(i.attachments.size <= 0) {
                i.reply("No file provided");
                return;
            }

            let json;
           for(const attachment_ of i.attachments) {
            const attachment = attachment_[1]

            console.log(attachment.contentType)

            if(attachment.name !== "application/json") continue;

            console.log(await get_json_object(attachment.url));

            break;
           }

           if(!json) {
            i.reply("File with wrong extension or empty file")
            return;
           }


           statement.restart();

           await i.reply("Settings changed")
           

    }
}

async function ban_at_stage(client: Client, i: Message, statement: CurrentStatement) {
    switch(statement.current_position[1]) {
        case 0:
           
        case 1:
           

    }
}


export {warn_at_stage}
