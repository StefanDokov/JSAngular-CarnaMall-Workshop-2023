import { Document, RefType } from "mongoose";

export default interface Ureserve extends Document {
    dateFrom: string;
    forDays: number;
    cardNum: string;
    costPrice: number;
    reserveId: RefType;
}

export default interface User extends Document {
    email: string;
    username: string;
    password: string;
    userReserves: Ureserve[];
    isValidPassword(password: string): Promise<Error | boolean>
}