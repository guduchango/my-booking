import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {PriceInterface, PriceRageInterface } from "../../Models/Price/PriceInterface";

export class PriceHttpService {

    readonly url: string = 'price';

    public async getPrices (): Promise<PriceInterface[]> { 
        const response: AxiosResponse<PriceInterface[]> = 
        await axiosClient.get<PriceInterface[]>(this.url);
        return response.data;
    }

    public async storeRangePrice (priceRange: PriceRageInterface): Promise<PriceInterface[]>  { 
        const storeRangePriceUrl = this.url + "/range-price"
        const response: AxiosResponse<PriceInterface[]> = 
        await axiosClient.post(storeRangePriceUrl,priceRange);
        return response.data as PriceInterface[]
    }
}
