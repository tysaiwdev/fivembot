
import Command from "../../structures/Command.js";
import { Events } from "discord.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: Events.PresenceUpdate,
        })
    }

    run = async (_, newPresence) => {
        const status = newPresence.activities[0]?.state
        const regex = /\b(?:https?:\/\/)?(?:www\.)?(?:discord\.(?:gg|io|me|li)|discordapp\.com\/invite)\/([a-zA-Z0-9]+)/;
        const result = regex.exec(status)

        if(result) {
            const bio = result[1]
            const invite = await newPresence.member.guild.invites.fetch({ code: bio, force: true }).catch(() => {})
            if(invite || bio === newPresence?.guild?.vanityURLCode) {
               await newPresence.member.roles.add(process.env.PRESENCE_ROLE_ID).catch((er) => { console.log(`[ ERROR DETECTADO ] - ${er.message}`) })
            }
        }
        
    }
}