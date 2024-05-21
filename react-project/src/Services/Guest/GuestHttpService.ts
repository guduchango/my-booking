import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {GuestInterface } from "../../Models/Guest/GuestInterface";

export class GuestHttpService {

    readonly url: string = 'guest';

    public async getGuests (): Promise<GuestInterface[]> { 
        const response: AxiosResponse<GuestInterface[]> = 
        await axiosClient.get<GuestInterface[]>(this.url);
        return response.data;
    }

    public async storeGuest (guest: GuestInterface): Promise<GuestInterface> { 
        const response: AxiosResponse<GuestInterface> = 
        await axiosClient.post<GuestInterface>(this.url,guest);
        return response.data;
    }

    public async updateGuest (guest: GuestInterface, gue_id: number): Promise<GuestInterface> { 
        const updateUrl = this.url + "/" + gue_id
        const response: AxiosResponse<GuestInterface> = 
        await axiosClient.put<GuestInterface>(updateUrl,guest);
        return response.data;
    }
}
