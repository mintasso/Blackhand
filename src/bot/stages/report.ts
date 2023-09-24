import { Client, Interaction } from "discord.js";
import { CurrentStatement } from "./current_statement";


async function report_stage(client: Client, i: Interaction, statement: CurrentStatement) {
    switch(statement.current_position[1]) {
        case 0:
            i.channel?.send("Please, provide descipion of report:")
            statement.next_stage();
        case 0:
            if(i.is)
                console.log()
    }
}


export {report_stage}
