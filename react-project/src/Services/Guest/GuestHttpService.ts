import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {GuestInterface } from "../../Models/Guest/GuestInterface";

export class GuestHttpService {

    public async getGuests (url: string): Promise<GuestInterface[]> { 
        const response: AxiosResponse<GuestInterface[]> = await axiosClient.get<GuestInterface[]>(url);
        return response.data;
    }
}
