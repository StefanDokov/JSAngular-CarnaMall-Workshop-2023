import { Schema, model } from "mongoose";
import Post from './post.interface';

const PostSchema = new Schema(
    {
        fname: {
            type: String,
            required: true,
        },
        sname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        descr: {
            type: String,
            required: true
        }
    },
    {
        timestamps: true
    }
);


export default model<Post>('Post', PostSchema); 