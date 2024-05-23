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

    public async storeReservation (reservation: ReservationInterface): Promise<ReservationInterface> { 
        const response: AxiosResponse<ReservationInterface> = 
        await axiosClient.post<ReservationInterface>(this.url,reservation);
        return response.data;
    }

    public async updateReservation (reservation: ReservationInterface, res_id: number): Promise<ReservationInterface> { 
        const updateUrl = this.url + "/" + res_id
        const response: AxiosResponse<ReservationInterface> = 
        await axiosClient.put<ReservationInterface>(updateUrl,reservation);
        return response.data;
    }
}
