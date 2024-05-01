import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { GuestInterface } from '../../Models/Guest/GuestInterface';

export class GuestStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(guest: GuestInterface) {
        this.transaction('rw', this.guests, async () => {

            if ((await this.guests.where({ gue_id: guest.gue_id }).count()) === 0) {
                const id = await this.guests.add(
                    guest
                );
                console.log(`Added guests with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(gue_id: number, guest:GuestInterface){
        this.transaction('rw', this.guests, async () => {
            if ((await this.guests.where({ gue_id: guest.gue_id }).count()) !== 0) {
                const id = await this.guests.update(
                    gue_id,
                    guest
                );
                console.log(`Updated guests with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(gue_id: number) {
        return await this.guests.where({ gue_id: gue_id }).first()
    }

    async getAll(){
        return await this.guests.toArray()
    }

}