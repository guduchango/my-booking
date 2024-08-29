import { AxiosResponse } from "axios";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestModel } from "../../Models/Guest/GuestModel";
import { HttpBaseService } from "../HttpBaseService";
import { ApiResponseInterface } from "../../Models/ApiResponseInterface";

export class GuestHttpService extends HttpBaseService {

    readonly url: string = 'guest';

    public async getGuests(): Promise<GuestModel[]> {
        const response: AxiosResponse<GuestInterface[]> =
            await this.get<GuestInterface[]>(this.url);

        return response.data?.data.map(guestData => new GuestModel(guestData));
    }

    public async storeGuest(guest: GuestModel): Promise<GuestModel> {

        try {
            const response: AxiosResponse<GuestModel> =
                await this.post<GuestInterface, GuestModel>(this.url, guest.toPlainObject());
            return new GuestModel(response.data)
        } catch (error) {
            console.log("error chang create", error);
            throw error;
        }
    }

    public async updateGuest(guest: GuestModel, gue_id: number):Promise <ApiResponseInterface<GuestInterface>> {

        const updateUrl = this.url + "/" + gue_id
        const response: ApiResponseInterface<GuestInterface> =
            await this.put(updateUrl, guest.toPlainObject());

        return response;
    }
}
