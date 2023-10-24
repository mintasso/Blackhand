import { Client, Interaction, Message } from "discord.js";
import { CurrentStatement } from "./current_statement";
import {writeFile} from "fs"
import { FileOrganizer } from "../get_file";
import { image_types_list } from "../variables";
import { send_message_in_pv } from "../helper";

async function report_stage(client: Client, i: Message, statement: CurrentStatement) {
    switch(statement.current_position[1]) {
        case 0:
            console.log("description:", i.content);
            send_message_in_pv(client, i, "Please, send image")
            statement.next_step()
            break
        case 1:
            console.log("ssss")
            i.attachments.forEach(a => {
                console.log("oki")
                
                if(a.contentType !== null && image_types_list.includes(a.contentType)) {
                    const filename =  new FileOrganizer().add_file(a.url, a.contentType);
                    console.log(filename);
                    statement.next_step()

                    statement.restart()
                    i.reply("Thanks");
                }
            })
            break

    }
}

export { report_stage };
