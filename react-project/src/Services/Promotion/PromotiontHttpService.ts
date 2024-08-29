import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {PromotionInterface } from "../../Models/Promotion/PromotionInterface";

export class PromotionHttpService {

    readonly url: string = 'promotion';

    public async getPromotions (): Promise<PromotionInterface[]> { 
        const response: AxiosResponse<PromotionInterface[]> = 
        await axiosClient.get<PromotionInterface[]>(this.url);
        return response.data?.data as PromotionInterface[]
    }
}
