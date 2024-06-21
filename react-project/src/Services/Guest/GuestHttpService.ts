import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestModel } from "../../Models/Guest/GuestModel";

export class GuestHttpService {

    readonly url: string = 'guest';

    public async getGuests (): Promise<GuestModel[]> { 
        const response: AxiosResponse<GuestInterface[]> = 
        await axiosClient.get<GuestInterface[]>(this.url);
        return response.data.map(guestData => new GuestModel(guestData));

    }

    public async storeGuest (guest: GuestModel): Promise<GuestModel> { 
        const response: AxiosResponse<GuestModel> = 
        await axiosClient.post<GuestModel>(this.url,guest.toPlainObject());
        return new GuestModel(response.data)
    }

    public async updateGuest (guest: GuestModel, gue_id: number): Promise<GuestModel> { 
        const updateUrl = this.url + "/" + gue_id
        const response: AxiosResponse<GuestModel> = 
        await axiosClient.put<GuestModel>(updateUrl,guest.toPlainObject());
        return new GuestModel(response.data)
    }
}
