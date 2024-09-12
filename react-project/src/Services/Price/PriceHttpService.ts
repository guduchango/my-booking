import { AxiosResponse } from "axios";
import {PriceInterface } from "../../Models/Price/PriceInterface";
import { HttpBaseService } from "../HttpBaseService";

export class PriceHttpService extends HttpBaseService {

    readonly url: string = 'price';

    public async getPrices (): Promise<PriceInterface[]> { 
        const response: AxiosResponse<PriceInterface[]> = 
        await this.getPrivate<PriceInterface[]>(this.url);
        return response.data?.data as PriceInterface[];
    }
}
