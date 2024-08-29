import { UserModel } from "../User/UserModel";
import { HttpResponseInterface } from "./HttpResponseInterface";

export class HttpResponseModel implements HttpResponseInterface<UserModel> {

    private  data: <T>;
    private error: T[];

    constructor(
       
    ) {
       
    }
}