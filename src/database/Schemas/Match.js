import { Schema, model } from 'mongoose';

const MatchSchema = new Schema({
    id: { type: String },
    message_id: { type: String },
    likes: { type: Array, default: []}
});

export default model('match', MatchSchema)