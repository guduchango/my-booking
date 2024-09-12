import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitAvailableInterface } from "../../Models/Unit/UnitAvailableInterface";
import { HttpBaseService } from '../HttpBaseService';
import { UnitModel } from "../../Models/Unit/UnitModel";

export class UnitHttpService extends HttpBaseService {

    readonly url: string = 'unit';

    public async getUnits (): Promise<UnitInterface[]> { 
        const response: AxiosResponse<UnitInterface[]> = 
        await this.getPrivate<UnitInterface[]>(this.url);
        return response.data?.data as UnitInterface[]
    }
}
