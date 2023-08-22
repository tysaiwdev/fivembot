import Command from "../../structures/Command.js";
import { Events } from "discord.js";
export default class extends Command {
    constructor(client) {
        super(client, {
            name: Events.InteractionCreate,
        })
    }

    run = async (interaction) => {
        if(interaction.type === 3) {
            const component = this.client.components.find(component => component.id === interaction.customId)
            if(component) {
                try {
                    component.run(interaction)
                } catch (er) {
                    interaction.reply({ content: ":x: | Aconteceu algo errado ao executar essa interação!", ephemeral: true })
                    this.client.log.warn('INTERACTION', er.message)
                }
            }
        } else {
            const cmd = this.client.commands.find(command => command.name === interaction.commandName)

        if(cmd) {
            try {
                cmd.run(interaction)
            } catch (er) {
                interaction.reply({ content: ":x: | Aconteceu algo errado ao executar essa interação!", ephemeral: true })
                this.client.log.warn('INTERACTION', er.message)
            }
        }
        }
        
    }
}