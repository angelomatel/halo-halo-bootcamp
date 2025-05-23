import mongoose, { Schema, Document } from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI environment variable is not defined');
}
mongoose.connect(mongoUri, {
    dbName: 'bootcamp',
})
    .then(() => {
        console.log('MongoDB connected');
    })
    .catch((err) => {
        console.error('MongoDB connection error:', err);
    });

export interface IUser extends Document {
    username: string;
    avatarUrl: string;
    riotId: string;
    riotTag: string;
    riotPuuid: string;
    tftTier: string;
    tftRank: string;
    tftLP: number;
}

const userSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    avatarUrl: { type: String, required: true },
    riotId: { type: String, required: true },
    riotTag: { type: String, required: true },
    riotPuuid: { type: String, required: true },
    tftTier: { type: String, required: true },
    tftRank: { type: String, required: true },
    tftLP: { type: Number, required: true }
}, {
    timestamps: true
});

const User = mongoose.model<IUser>('User', userSchema);
export default User;