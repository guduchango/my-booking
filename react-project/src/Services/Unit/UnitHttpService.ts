import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {UnitInterface } from "../../Models/Unit/UnitInterface";

export class UnitHttpService {

    readonly url: string = 'unit';

    public async getUnits (): Promise<UnitInterface[]> { 
        const response: AxiosResponse<UnitInterface[]> = 
        await axiosClient.get<UnitInterface[]>(this.url);
        return response.data;
    }
}
