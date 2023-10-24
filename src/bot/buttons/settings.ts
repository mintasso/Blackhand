import { ButtonInteraction, Client,} from "discord.js";
import { send_message_in_pv } from "../helper";
import { main_dir } from "../../constants";
import { resolve } from "path";
import { table } from "../stages/current_statement";



const template_dir = resolve(main_dir, "src", "templates");

const warn_at = {
    name: "warn_at",
    executable: (client: Client, interaction: ButtonInteraction) => {
        if(!interaction.guild) return;
        if(interaction.user.id !== interaction.guild.ownerId) 
            interaction.reply("You are not owner");

        
        send_message_in_pv(client, interaction, {
            files: [resolve(template_dir, "template.json")],
            content: "Fill the template and send back",
        })
        
        table.get_user_statement(interaction.user.id).current_position = [2, 0];

    }
}


const ban_at = {
    name: "ban_at",
    executable: (client: Client, interaction: ButtonInteraction) => {

    }
}

export {warn_at, ban_at}
