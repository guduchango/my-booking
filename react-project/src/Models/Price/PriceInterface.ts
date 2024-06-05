


export interface PriceInterface {
    pri_id: number;
    pri_date: string;
    pri_price: number;
    pri_price_dolar: null;
    pri_uni_id: number;
    pri_res_id: number;
    pri_created_at: Date;
    pri_updated_at: Date;
}

export interface PriceRageInterface {
    pri_from: string;
    pri_to: string;
    pri_value: number;
    pri_uni_id: number;
}


// Define the type for the event
export interface CalendarEvent extends Event {
    title: string;
    start: Date;
    end: Date;
}
