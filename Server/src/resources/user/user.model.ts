import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';
import User from "./user.interface";

const ReserveSchema = new Schema( {
    dateFrom: {
        type: String,
        required: false,
    },
    forDays: {
        type: Number,
        required: false,

    },
    cardNum: {
        type: String,
        required: false,

    },
    costPrice: {
        type: Number,
        required: false,

    }, 
    reserveId: {
        type: Schema.Types.ObjectId,
        ref: 'Rent'
    }
    
});

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
    userReserves: {
        type: [ReserveSchema],
        required: false,
    }
        
   
}, {timestamps: true});

UserSchema.pre<User>('save', async function (next) {
    if (!this.isModified('password')) {
        return next();
    }
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
    
});

UserSchema.methods.isValidPassword = async function (password: string): Promise<Error | boolean> {
return await bcrypt.compare(password, this.password);
    
}

export default model<User>('User', UserSchema);