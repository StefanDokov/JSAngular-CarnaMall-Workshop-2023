import { Document } from "mongoose";

export default interface Post extends Document {
    fname: string;
    sname: string;
    email: string;
    descr: string;
}