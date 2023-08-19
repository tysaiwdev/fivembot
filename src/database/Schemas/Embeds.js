import { Schema, model } from 'mongoose';

const EmbedSchema = new Schema({
    id: { type: String },
    name: { type: String }
});

export default model('embeds', EmbedSchema)