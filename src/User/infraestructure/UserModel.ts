import { model, Schema } from 'mongoose';

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true,
        index: { unique: true },
    },
    password: {
        type: String,
        required: true
    },
    team: {
        type: String,
        required: true,
        enum: ["rojo", "amarillo", "azul"],
    },
    lastConnection: {
        type: Date,
        default: Date.now(),
    }
});

const UserModel = model('User', UserSchema);

export { UserModel }