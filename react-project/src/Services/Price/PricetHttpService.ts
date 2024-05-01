import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {PriceInterface } from "../../Models/Price/PriceInterface";

export class PriceHttpService {

    readonly url: string = 'price';

    public async getPrices (): Promise<PriceInterface[]> { 
        const response: AxiosResponse<PriceInterface[]> = 
        await axiosClient.get<PriceInterface[]>(this.url);
        return response.data;
    }
}
