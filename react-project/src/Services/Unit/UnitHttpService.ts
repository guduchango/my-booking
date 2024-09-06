import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {UnitInterface } from "../../Models/Unit/UnitInterface";
import { UnitAvailableInterface } from "../../Models/Unit/UnitAvailableInterface";

export class UnitHttpService {

    readonly url: string = 'unit';

    public async getUnits (): Promise<UnitInterface[]> { 
        const response: AxiosResponse<UnitInterface[]> = 
        await axiosClient.get<UnitInterface[]>(this.url);
        return response.data?.data as UnitInterface[]
    }

    public async storeUnit (guest: UnitInterface): Promise<UnitInterface> { 
        const response: AxiosResponse<UnitInterface> = 
        await axiosClient.post<UnitInterface>(this.url,guest);
        return response.data;
    }

    public async updateUnit (guest: UnitInterface, uni_id: number): Promise<UnitInterface> { 
        const updateUrl = this.url + "/" + uni_id
        const response: AxiosResponse<UnitInterface> = 
        await axiosClient.put<UnitInterface>(updateUrl,guest);
        return response.data;
    }

    public async availableUnits(availableUnitRequest: UnitAvailableInterface): Promise<AxiosResponse>{
        const response: AxiosResponse<UnitInterface[]> = 
        await axiosClient.post<UnitInterface[]>(this.url+'/units-available',availableUnitRequest)
        return response.data as UnitInterface[];
    }
}
