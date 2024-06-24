import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import { UserModel } from "../../Models/User/UserModel";
import { HttpBaseService } from "../HttpBaseService";
import { UserInterface } from '../../Models/User/UserInterface';


export class UserHttpService extends HttpBaseService {

    readonly url: string = 'user/create';

    public async storeUser(guest: UserModel): Promise<UserModel> { 
        const response: AxiosResponse<UserModel> = 
        await this.post<UserInterface,UserModel>(this.url,guest.toPlainObject());
        return new UserModel(response.data)
    }

}
