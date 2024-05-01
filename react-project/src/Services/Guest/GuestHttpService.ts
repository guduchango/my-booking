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
}
