import Dexie from "dexie"
import { StorageService } from "../StorageService"
import { PriceInterface } from '../../Models/Price/PriceInterface';

export class PriceStorageService extends StorageService {

    db: Dexie

    constructor() {
        super()
        this.db = this
    }

    async create(price: PriceInterface) {
        this.transaction('rw', this.prices, async () => {

            if ((await this.prices.where({ pri_id: price.pri_id }).count()) === 0) {
                const id = await this.prices.add(
                    price
                );
                console.log(`Added price with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async update(pri_id: number, price:PriceInterface){
        this.transaction('rw', this.prices, async () => {
            if ((await this.prices.where({ pri_id: price.pri_id }).count()) !== 0) {
                const id = await this.prices.update(
                    pri_id,
                    price
                );
                console.log(`Updated price with id ${id}`);
            }
        }).catch(e => {
            console.log(e.stack || e);
        });
    }

    async getById(pri_id: number) {
        return await this.prices.where({ pri_id: pri_id }).first()
    }

    async getAll(){
        return await this.prices.toArray()
    }

}