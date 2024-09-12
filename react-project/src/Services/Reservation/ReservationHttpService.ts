import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import { ReservationInterface } from "../../Models/Reservation/ReservationInterface";
import { HttpBaseService } from "../HttpBaseService";

export class ReservationHttpService extends HttpBaseService {

    readonly url: string = 'reservation';

    public async getReservations (): Promise<ReservationInterface[]> { 
        const response: AxiosResponse<ReservationInterface[]> = 
        await this.getPrivate<ReservationInterface[]>(this.url);
        return response.data.data as ReservationInterface[];
    }
}
