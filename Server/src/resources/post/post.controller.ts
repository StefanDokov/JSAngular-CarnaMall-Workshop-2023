import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from '@/middleware/validation.middleware';
import validate from './post.validation';
import PostService from './post.service';


class PostController implements Controller {

    public path = '/posts';
    public router = Router();
    private PostService = new PostService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
       this.router.post(
        `${this.path}`,
        validationMiddleware(validate.create),
        this.create
       );
    }


    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
         const {fname, sname, email, descr } = req.body;

         const post = await this.PostService.create(fname, sname, email, descr);

         res.status(201).json({post, message: 'Your message has been sent!'});

        } catch(err: any) {
           next(new HttpException(400, 'Cannot create post'));
        }
    }
}

export default PostController;