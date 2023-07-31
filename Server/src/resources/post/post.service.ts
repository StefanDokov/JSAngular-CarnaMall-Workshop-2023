import PostModel from "./post.model";
import Post from "./post.interface";

class PostService {
    private post = PostModel;
    

    // Create a new post
    public async create(fname: string, sname: string, email: string, descr: string): Promise<Post> {
        try{
         const post = await this.post.create({fname, sname, email, descr});

         return post;
        }catch(err){
          throw new Error(`Unable to create post`);
        }
    }
    
}

export default PostService;
