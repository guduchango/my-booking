import { ReservationInterface } from "./ReservationInterface";
import { UnitInterface } from "../Unit/UnitInterface";
import { GuestInterface } from "../Guest/GuestInterface";
import { PromotionInterface } from "../Promotion/PromotionInterface";

export class ReservationModel implements ReservationInterface {

    private _res_id: number;
    private _res_start_date: string;
    private _res_end_date: string;
    private _res_adults: number;
    private _res_children: number;
    private _res_beds: number;
    private _res_nights: number;
    private _res_price: number;
    private _res_price_dolar: number;
    private _res_price_final: number;
    private _res_advance_payment: number;
    private _res_status: string;
    private _res_channel: string;
    private _res_comments: string;
    private _res_created_at: string;
    private _res_updated_at: string;
    private _res_beauty_dates: string;
    private _unit: UnitInterface;
    private _guest: GuestInterface;
    private _promotion: PromotionInterface;
    private _res_uni_id: number;
    private _res_gue_id: number;
    private _res_pro_id: number;

    constructor(
        res_id: number,
        res_start_date: string,
        res_end_date: string,
        res_adults: number,
        res_children: number,
        res_beds: number,
        res_nights: number,
        res_price: number,
        res_price_dolar: number,
        res_price_final: number,
        res_advance_payment: number,
        res_status: string,
        res_channel: string,
        res_comments: string,
        res_created_at: string,
        res_updated_at: string,
        res_beauty_dates: string,
        unit: UnitInterface,
        guest: GuestInterface,
        promotion: PromotionInterface,
        res_uni_id: number,
        res_gue_id: number,
        res_pro_id: number
    ) {
        this._res_id = res_id;
        this._res_start_date = res_start_date;
        this._res_end_date = res_end_date;
        this._res_adults = res_adults;
        this._res_children = res_children;
        this._res_beds = res_beds;
        this._res_nights = res_nights;
        this._res_price = res_price;
        this._res_price_dolar = res_price_dolar;
        this._res_price_final = res_price_final;
        this._res_advance_payment = res_advance_payment;
        this._res_status = res_status;
        this._res_channel = res_channel;
        this._res_comments = res_comments;
        this._res_created_at = res_created_at;
        this._res_updated_at = res_updated_at;
        this._res_beauty_dates = res_beauty_dates;
        this._unit = unit;
        this._guest = guest;
        this._promotion = promotion;
        this._res_uni_id = res_uni_id;
        this._res_gue_id = res_gue_id;
        this._res_pro_id = res_pro_id;
    }


    // res_id
    public get res_id(): number {
        return this._res_id;
    }
    public set res_id(value: number) {
        this._res_id = value;
    }

    // res_start_date
    public get res_start_date(): string {
        return this._res_start_date;
    }
    public set res_start_date(value: string) {
        this._res_start_date = value;
    }

    // res_end_date
    public get res_end_date(): string {
        return this._res_end_date;
    }
    public set res_end_date(value: string) {
        this._res_end_date = value;
    }

    // res_adults
    public get res_adults(): number {
        return this._res_adults;
    }
    public set res_adults(value: number) {
        this._res_adults = value;
    }

    // res_children
    public get res_children(): number {
        return this._res_children;
    }
    public set res_children(value: number) {
        this._res_children = value;
    }

    // res_beds
    public get res_beds(): number {
        return this._res_beds;
    }
    public set res_beds(value: number) {
        this._res_beds = value;
    }

    // res_nights
    public get res_nights(): number {
        return this._res_nights;
    }
    public set res_nights(value: number) {
        this._res_nights = value;
    }

    // res_price
    public get res_price(): number {
        return this._res_price;
    }
    public set res_price(value: number) {
        this._res_price = value;
    }

    // res_price_dolar
    public get res_price_dolar(): number {
        return this._res_price_dolar;
    }
    public set res_price_dolar(value: number) {
        this._res_price_dolar = value;
    }

    // res_price_final
    public get res_price_final(): number {
        return this._res_price_final;
    }
    public set res_price_final(value: number) {
        this._res_price_final = value;
    }

    // res_advance_payment
    public get res_advance_payment(): number {
        return this._res_advance_payment;
    }
    public set res_advance_payment(value: number) {
        this._res_advance_payment = value;
    }

    // res_status
    public get res_status(): string {
        return this._res_status;
    }
    public set res_status(value: string) {
        this._res_status = value;
    }

    // res_channel
    public get res_channel(): string {
        return this._res_channel;
    }
    public set res_channel(value: string) {
        this._res_channel = value;
    }

    // res_comments
    public get res_comments(): string {
        return this._res_comments;
    }
    public set res_comments(value: string) {
        this._res_comments = value;
    }

    // res_created_at
    public get res_created_at(): string {
        return this._res_created_at;
    }
    public set res_created_at(value: string) {
        this._res_created_at = value;
    }

    // res_updated_at
    public get res_updated_at(): string {
        return this._res_updated_at;
    }
    public set res_updated_at(value: string) {
        this._res_updated_at = value;
    }

    // res_beauty_dates
    public get res_beauty_dates(): string {
        return this._res_beauty_dates;
    }
    public set res_beauty_dates(value: string) {
        this._res_beauty_dates = value;
    }

    // unit
    public get unit(): UnitInterface {
        return this._unit;
    }
    public set unit(value: UnitInterface) {
        this._unit = value;
    }

    // guest
    public get guest(): GuestInterface {
        return this._guest;
    }
    public set guest(value: GuestInterface) {
        this._guest = value;
    }

    // promotion
    public get promotion(): PromotionInterface {
        return this._promotion;
    }
    public set promotion(value: PromotionInterface) {
        this._promotion = value;
    }

    // res_uni_id
    public get res_uni_id(): number {
        return this._res_uni_id;
    }
    public set res_uni_id(value: number) {
        this._res_uni_id = value;
    }

    // res_gue_id
    public get res_gue_id(): number {
        return this._res_gue_id;
    }
    public set res_gue_id(value: number) {
        this._res_gue_id = value;
    }

    // res_pro_id
    public get res_pro_id(): number {
        return this._res_pro_id;
    }
    public set res_pro_id(value: number) {
        this._res_pro_id = value;
    }
    
}
