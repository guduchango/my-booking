import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {ReservationInterface } from "../../Models/Reservation/ReservationInterface";

export class ReservationHttpService {

    public async getReservations (url: string): Promise<ReservationInterface[]> { 
        const response: AxiosResponse<ReservationInterface[]> = await axiosClient.get<ReservationInterface[]>(url);
        return response.data;
    }
}
