import { AxiosResponse } from "axios";
import { UserModel } from "../../Models/User/UserModel";
import { HttpBaseService } from "../HttpBaseService";
import { UserInterface } from '../../Models/User/UserInterface';


export class UserHttpService extends HttpBaseService {

    readonly register: string = 'user/create';
    readonly login: string = 'user/login';

    public async storeUser(guest: UserModel): Promise<UserModel> { 
        const response: AxiosResponse<UserModel> = 
        await this.post<UserInterface,UserModel>(this.register,guest.toPlainObject());
        return new UserModel(response.data)
    }

    public async loginUser(guest: UserModel): Promise<UserModel> { 
        const response: AxiosResponse<UserModel> = 
        await this.post<UserInterface,UserModel>(this.login,guest.toPlainObject());
        return new UserModel(response.data)
    }

}
