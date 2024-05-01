import { UnitInterface } from "../Unit/UnitInterface";


export interface IPrice {
    pri_id:          number;
    pri_date:        Date;
    pri_price:       number;
    pri_price_dolar: null;
    unit:            UnitInterface;
    pri_created_at:  Date;
    pri_updated_at:  Date;
}