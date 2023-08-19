import Command from "../../structures/Command.js";
import { ActionRowBuilder, ButtonBuilder, EmbedBuilder, Events, StringSelectMenuBuilder } from "discord.js";
import '../../database/index.js'
export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'ready',
        })
    }

    run = async () => {
        await this.client.registryCommands()

        const data = {
            players: await getPlayers(),
            info: await getInfo()
        }
        this.client?.user?.setPresence({
            status: 'online',
            activities: [{
                type: 0,
                name: `${data.info.vars.sv_projectName} [${data.players}/${data.info.vars.sv_maxClients}]`,
               }],
        });
    }
}

async function getPlayers() {
    const res = await fetch(`http://${process.env.FIVEM_IP}/players.json`).catch(() => {})
    const array = await res.json()
    return array.length
}

async function getInfo() {
    const res = await fetch(`http://${process.env.FIVEM_IP}/info.json`).catch(() => {})
    const array = await res.json()
    return array
}