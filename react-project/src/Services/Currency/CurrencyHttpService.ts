import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import { CurrencyInterface } from "../../Models/Currency/CurrencyInterface";


export class CurrencyHttpService {

    readonly url: string = 'currency';

    public async getCurrencys (): Promise<CurrencyInterface[]> { 
        const response: AxiosResponse<CurrencyInterface[]> = 
        await axiosClient.get<CurrencyInterface[]>(this.url);
        return response.data?.data as CurrencyInterface[];
    }
}
