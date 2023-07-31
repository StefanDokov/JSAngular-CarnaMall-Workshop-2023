import { Document, RefType } from "mongoose";

export interface Reserve extends Document {
    dateFrom: string;
    forDays: number;
    cardNum: string;
    costPrice: number;
    resOwner: RefType;
}

export interface Rent extends Document {
    model: string;
    image: string;
    doors: number;
    seats: number;
    transmission: string;
    price: number;
    year: number;
    ownerId: string;
    reserves: Reserve[];
}