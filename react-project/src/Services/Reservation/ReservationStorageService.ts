import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { ReservationInterface } from '../../Models/Reservation/ReservationInterface';

export class ReservationStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(reservation: ReservationInterface) {
        this.transaction('rw', this.reservations, async () => {

            if ((await this.reservations.where({ res_id: reservation.res_id }).count()) === 0) {
                const id = await this.reservations.add(
                    reservation
                );
                console.log(`Added reservation with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(res_id: number, reservation:ReservationInterface){
        this.transaction('rw', this.reservations, async () => {
            if ((await this.reservations.where({ res_id: reservation.res_id }).count()) !== 0) {
                const id = await this.reservations.update(
                    res_id,
                    reservation
                );
                console.log(`Updated reservation with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(res_id: number) {
        return await this.reservations.where({ res_id: res_id }).first()
    }

    async getAll(){
        return await this.reservations.toArray()
    }

}