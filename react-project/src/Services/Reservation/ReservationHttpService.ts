import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {ReservationInterface } from "../../Models/Reservation/ReservationInterface";

export class ReservationHttpService {

    readonly url: string = 'reservation';

    public async getReservations (): Promise<ReservationInterface[]> { 
        const response: AxiosResponse<ReservationInterface[]> = 
        await axiosClient.get<ReservationInterface[]>(this.url);
        return response.data;
    }
}
