import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "./user.validation"
import UserService from "./user.service";
import authenticated from "@/middleware/authenticated.middleware";


class UserController implements Controller {
    public path = '/users';
    public router = Router();
    private UserService = new UserService();

    constructor() {
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/register`,
            validationMiddleware(validate.register),
            this.register
        );
        this.router.post(
            `${this.path}/login`,
            validationMiddleware(validate.login),
            this.login
        );
        this.router.get(`${this.path}`, authenticated, this.getUser);
        this.router.post(
            `${this.path}/update`,
            validationMiddleware(validate.update),
            authenticated,
            this.updateU
        );
        this.router.post(
            `${this.path}/delInfo`,
            authenticated,
            this.delInfo
        );
    }

    private register = async(
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
        try {
            const {username, email, password} = req.body;
            const token = await this.UserService.register(    
                username,
                email,
                password,
            );
            res.status(201).json({token, message: 'Registered!'});
        } catch (error: any) {
            next(new HttpException(400, error.message))
        }
    };
    private login = async (
        req: Request,
        res: Response,
        next: NextFunction
    ): Promise<Response | void> => {
          try {
            const {email, password} = req.body;
            const token = await this.UserService.login(email, password);
            res.status(200).json({token, message: 'Logged In'});
          } catch (error: any) {
            next(new HttpException(400, error.message));
          }
    };
    private getUser = (
        req: Request,
        res: Response,
        next: NextFunction
        ): Response | void => {
         if(!req.user) {
            return next(new HttpException(404, 'No such user'))
         }
         res.status(200).json({user: req.user})
    };

    private updateU = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {userId, update} = req.body;
            const resu = await this.UserService.updateUser(userId, update);
            res.status(200).json({resu});
        } catch (error) {
            return next(new HttpException(404, 'No such user'))
        }
    }
    private delInfo = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const { id, infoId } = req.body;
            const resu = await this.UserService.delInfo(id, infoId);
            res.status(200).json({resu});
        } catch (error) {
            return next(new HttpException(404, 'No such user'))
        }
    }
}

export default UserController;