
import UserModel from "./user.model";
import token from "@/utils/token";
import User  from "./user.interface";
import Ureserve from "./user.interface";

class UserService {
    private user = UserModel;

    // register a new user

    public async register(
        username: string,
        email: string,
        password: string,
    ): Promise<string | Error> {
        try {
            const existingUser = await this.user.findOne({ email });
            if (existingUser) {
                throw new Error('User already exists');
              }

            const user = await this.user.create({
                username, email, password
            })
            
            const accessToken = token.createToken(user);
            return accessToken;
        } catch (error) {
            throw new Error('Unable to create user');
        }
    }

    // attempt a login


    public async login(
        email: string,
        password: string
    ): Promise<string | Error> {
        try {
            const user = await this.user.findOne({email});
            if (!user) {
                throw new Error ('Unable to find a user with that Email Address')
            }
            if (await user.isValidPassword(password)) {
                return token.createToken(user);
            } else {
                throw new Error('Wrong credentials given');
            }
        } catch (error: any) {
            throw new Error(error.message);
        }
    }

    public async updateUser(
        userId: string,
        update: Ureserve,
    ): Promise<string | Error | void> {
        try {
            const usera = await this.user.findById(userId);
            if (!usera) {
                throw new Error ('Unable to find a user with that Email Address')
            }
            
            usera.userReserves.push(update);
            
            await usera.save();
        } catch (error) {
            throw new Error('Unable to update this offer');
        }
    }
    public async delInfo(
        userId: string,
        infoId: string,
    ): Promise<string | Error | void> {
        try {
            let usera = await this.user.findById(userId);
            if (!usera) {
                throw new Error ('Unable to find a user with that Email Address')
            }
            
            usera.userReserves = usera.userReserves.filter(el => el._id !== infoId);
            usera.save();
        } catch (error) {
            throw new Error('Unable to delete this offer');
        }
    }

}

export default UserService;

