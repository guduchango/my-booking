import { AxiosResponse } from "axios";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestModel } from "../../Models/Guest/GuestModel";
import { HttpBaseService } from "../HttpBaseService";

export class GuestHttpService extends HttpBaseService {

    readonly url: string = 'guest';
    
    public async getGuests(): Promise<GuestModel[]> {
        const response: AxiosResponse<GuestInterface[]> =
            await this.getPrivate<GuestInterface[]>(this.url);

        return response.data?.data.map(guestData => new GuestModel(guestData));
    }
}
