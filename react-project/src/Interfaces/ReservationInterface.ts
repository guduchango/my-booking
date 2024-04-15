import GuestInterface from "./GuestInterface";
import UnitInterface from "./UnitInterface";

interface ReservationInterface {
    res_id: number;
    res_start_date: Date;
    res_end_date: Date;
    res_adults: number;
    res_children: number;
    res_beds: number;
    res_nights: number;
    res_discount_value: number;
    res_discount_detail: number;
    res_price: number;
    res_price_dolar: number;
    res_price_final: number;
    res_advance_payment: number;
    res_status: number;
    res_channel: number;
    res_comments: number;
    res_created_at: number;   
    res_updated_at: number;
    guest: GuestInterface;
    res_beauty_dates: string;
    unit: UnitInterface;
}

export default ReservationInterface