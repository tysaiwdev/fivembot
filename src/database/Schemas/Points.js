import { Schema, model } from 'mongoose';

const PointsSchema = new Schema({
    id: { type: String },
    messages: { type: Number, default: 0 },
    points: { type: Number, default: 0 }
});

export default model('points', PointsSchema)