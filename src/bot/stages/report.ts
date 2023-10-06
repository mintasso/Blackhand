import { Client, Interaction, Message } from "discord.js";
import { CurrentStatement } from "./current_statement";


async function report_stage(client: Client, i: Message, statement: CurrentStatement) {
    switch(statement.current_position[1]) {
        case 0:
            i.channel?.send("Please, provide the description of report:")
            statement.next_stage();
        case 0:
        console.log(i.content)
        statement.restart()
        i.reply("Thank you for reporting.");
        break;
    }
}


export {report_stage}
