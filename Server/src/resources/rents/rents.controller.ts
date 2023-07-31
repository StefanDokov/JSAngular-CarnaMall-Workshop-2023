import { Router, Request, Response, NextFunction } from "express";
import Controller from "@/utils/interfaces/controller.interface";
import HttpException from "@/utils/exceptions/http.exception";
import validationMiddleware from "@/middleware/validation.middleware";
import validate from "./rents.validation";
import authenticated from "@/middleware/authenticated.middleware";
import RentService from "./rents.service";

class RentController implements Controller {
    public path = '/rents';
    public router = Router();
    private RentService = new RentService();


    constructor(){
        this.initialiseRoutes();
    }

    private initialiseRoutes(): void {
        this.router.post(
            `${this.path}/create`,
            validationMiddleware(validate.craft),
            this.create
        );
        this.router.get(
            `${this.path}`,
            this.getAll
        );
        this.router.get(
            `${this.path}/details/:id`,
            this.getOne
        );
        this.router.post(
            `${this.path}/:id/edit`,
            validationMiddleware(validate.craft),
            authenticated,
            this.editRent
        );
        this.router.delete(
            `${this.path}/:id/delete`,
            authenticated,
            this.deleteRent
        );
        this.router.post(
            `${this.path}/:id/link`,
            validationMiddleware(validate.rentInfo),
            authenticated,
            this.updateInfo
        );
        
    }
    
    private create = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
         const {model, image, doors, seats, transmission, price, year, ownerId} = req.body;

         const post = await this.RentService.craft(model, image, doors, seats, transmission, price, year, ownerId);

         res.status(201).json({post, message: 'Rent Created!'});

        } catch(err: any) {
           next(new HttpException(400, 'Cannot create rent'));
        }
    }

    private getAll = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const resu = await this.RentService.getRents();
            res.status(200).json(resu);
        } catch (error) {
            return next(new HttpException(404, 'Can\'t reach rents'))
        }
    }
    private getOne = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            
            const resu = await this.RentService.getOneRent(req.params.id);
            res.status(200).json({resu});
        } catch (error) {
            return next(new HttpException(404, 'Can\'t reach rents'))
        }
    }
    private editRent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const editObj = req.body;
            const id = req.params.id;
            const resu = await this.RentService.updateRent(id, editObj);
            res.status(200).json({ message: 'Rent Updated!'});
        } catch (error) {
            return next(new HttpException(404, 'Can\'t reach rents'))
        }
    }
    private deleteRent = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const id = req.params.id;
            const resu = await this.RentService.deleteRent(id);
            res.status(200).json({resu, message: 'Rent Deleted!'});
        } catch (error) {
            return next(new HttpException(404, 'Can\'t reach rents'))
        }
    }
    private updateInfo = async (
        req: Request,
        res: Response,
        next: NextFunction
    ) : Promise<Response | void> => {
        try {
            const {rentId, updateRent} = req.body;
            const resu = await this.RentService.updateRentOffer(rentId, updateRent);
            res.status(200).json({resu});
        } catch (error) {
            return next(new HttpException(404, 'Can\'t reach rents'))
        }
    }

}

export default RentController;