import { ActionRowBuilder, ButtonBuilder, ChannelManager, EmbedBuilder, messageLink } from "discord.js";
import Command from "../../structures/Command.js";
import Match from "../../database/Schemas/Match.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: 'statusChange',
        })
    }

    run = async (data) => {
    //     if(data.type === 'member') {
    //         const guild = this.client.guilds.cache.get(process.env.GUILD_ID)
    //         let totalMembersInCall = 0;

    //      guild.channels.cache.forEach(channel => {
    //   if (channel.type === 2 && channel.members.size > 0) {
    //     totalMembersInCall += channel.members.size;
    //   }
    //      });

    //      const membersOnline = guild.members.cache.filter(member => member?.presence?.status !== 'offline').map(a => a?.id)?.length
     
    //         guild.channels.edit(process.env.MEMBERCOUNT_CHANNEL_ID, { name: `Membros Total: ${guild.memberCount}` }).catch(() => {})
    //         guild.channels.edit(process.env.MEMBERINCALL_CHANNEL_ID, { name: `Membros em Call: ${totalMembersInCall}` }).catch(() => {})
    //         guild.channels.edit(process.env.MEMBERONLINE_CHANNEL_ID, { name: `Membros Online: ${membersOnline}` }).catch(() => {})
    //     } else if(data.type === 'channel') {
    //         const guild = this.client.guilds.cache.get(process.env.GUILD_ID)
    //         guild.channels.edit(process.env.CHANNELSCOUNT_CHANNEL_ID, { name: `Canais: ${guild.channels.cache.size}` }).catch(() => {})
    //     }
    }
}