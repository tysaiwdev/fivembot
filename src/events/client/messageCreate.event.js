
import Points from "../../database/Schemas/Points.js";
import Command from "../../structures/Command.js";
import { Events } from "discord.js";

export default class extends Command {
    constructor(client) {
        super(client, {
            name: Events.MessageCreate,
        })
    }

    run = async (message) => {
        // if(!message.guild) return;
        // if(message.author.bot) return;

        // const localData = this.client.userPoints.get(message.author.id)
        // if(!localData) return this.client.userPoints.set(message.author.id, { messages: 0 })

        
        // this.client.userPoints.delete(message.author.id)
        // this.client.userPoints.set(message.author.id, { messages: localData.messages + 1 })
        // if(localData.messages > 99) {
        //     this.client.userPoints.delete(message.author.id)
        //     this.client.userPoints.set(message.author.id, { messages: 0 })
        //     const data = await Points.findOne({ id: message.author.id })
        //     if(data) {
        //         data.messages = data.messages + localData.messages
        //         data.points = data.points + 10
        //         await data.save()
        //     } else {
        //         await new Points({
        //             id: message.author.id,
        //             points: 10,
        //             messages: 100
        //         }).save()
        //     }
        // }
    }
}