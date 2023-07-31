import { Schema, model } from "mongoose";
import {Rent} from "./rents.interface";

const ReserveInfo = new Schema(
    {
        resOwner: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    
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
        }
}
)


const RentSchema = new Schema(
    {
        model: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
        doors: {
            type: Number,
            required: true,
        },
        seats: {
            type: Number,
            required: true
        },
        transmission: {
            type: String,
            required: true,
        },
        year: {
            type: Number,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        ownerId: {
            type: String,
            required: true,
        },
        reserves: {
            type: [ReserveInfo],
            required: false,
        }
    },
    {
        timestamps: true
    }
)
export default model<Rent>('Rent', RentSchema); 