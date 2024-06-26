import { AxiosResponse } from "axios";
import {GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestModel } from "../../Models/Guest/GuestModel";
import { HttpBaseService } from "../HttpBaseService";

export class GuestHttpService extends HttpBaseService {

    readonly url: string = 'guest';

    public async getGuests (): Promise<GuestModel[]> { 
        const  response: AxiosResponse<GuestInterface[]> = 
        await this.getPrivate<GuestInterface[]>(this.url);
        return  response.data.map(guestData => new GuestModel(guestData));
    }

    public async storeGuest (guest: GuestModel): Promise<GuestModel> { 
        const response: AxiosResponse<GuestModel> = 
        await this.postPrivate<GuestInterface,GuestModel>(this.url,guest.toPlainObject());
        return new GuestModel(response.data)
    }

    public async updateGuest (guest: GuestModel, gue_id: number): Promise<GuestModel> { 
        const updateUrl = this.url + "/" + gue_id
        const response: AxiosResponse<GuestModel> = 
        await this.putPrivate<GuestInterface,GuestModel>(updateUrl,guest.toPlainObject());
        return new GuestModel(response.data)
    }
}
