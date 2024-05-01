
import Dexie, { Table } from 'dexie';
import { GuestInterface } from '../Models/Guest/GuestInterface';
import { ReservationInterface } from '../Models/Reservation/ReservationInterface';


export class StorageService extends Dexie {
    public guests!: Table<GuestInterface>; 
    public reservations!: Table<ReservationInterface>; 

    public constructor() {
        super("MyBookintV1");
        this.version(1).stores({
            guests: 
                "gue_id,"+
                "gue_name,"+
                "gue_last_name,"+
                "gue_identity_document,"+
                "gue_email,"+
                "gue_phone_number,"+
                "gue_created_at,"+
                "gue_updated_at",
            reservations: 
                "res_id,"+
                "res_start_date,"+
                "res_end_date,"+
                "res_adults,"+
                "res_children,"+
                "res_beds,"+
                "res_nights,"+
                "res_discount_value,"+
                "res_discount_detail,"+
                "res_price,"+
                "res_price_dolar,"+
                "res_price_final,"+
                "res_advance_payment,"+
                "res_status,"+
                "res_channel,"+
                "res_comments,"+
                "res_created_at,"+
                "res_updated_at,"+
                "res_beauty_dates"
                
        });
    }
    
}
