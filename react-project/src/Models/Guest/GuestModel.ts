import { isValidDOB, isValidEmail, isValidPositiveInteger } from "../../Utils/GeneralFunctions";
import { BaseModel } from "../BaseModel";
import { GuestInterface } from "./GuestInterface";

export class GuestModel extends BaseModel implements GuestInterface {
    // Private properties
    private _gue_id: number;
    private _gue_name: string;
    private _gue_last_name: string;
    private _gue_full_name: string;
    private _gue_identity_document: string;
    private _gue_email: string;
    private _gue_phone_number: string;
    private _gue_birthday: string;
    private _gue_age: number;
    private _gue_created_at: Date;
    private _gue_updated_at: Date;

    public constructor(IGuest?: GuestInterface) {

        super();

        if (IGuest !== undefined) {
            this.gue_id = (IGuest.gue_id !== undefined) ? IGuest.gue_id : 0
            this.gue_name = (IGuest.gue_name !== undefined) ? IGuest.gue_name : ""
            this.gue_last_name = (IGuest.gue_last_name !== undefined) ? IGuest.gue_last_name : ""
            this.gue_full_name = (IGuest.gue_full_name !== undefined) ? IGuest.gue_full_name : ""
            this.gue_identity_document = (IGuest.gue_identity_document !== undefined) ? IGuest.gue_identity_document : ""
            this.gue_email = (IGuest.gue_email !== undefined) ? IGuest.gue_email : ""
            this.gue_phone_number = (IGuest.gue_phone_number !== undefined) ? IGuest.gue_phone_number : ""
            this.gue_birthday = (IGuest.gue_birthday !== undefined) ? IGuest.gue_birthday : ""
            this.gue_age = (IGuest.gue_age !== undefined) ? IGuest.gue_age : 0
            this.gue_created_at = (IGuest.gue_created_at !== undefined) ? new Date(IGuest.gue_created_at) : new Date()
            this.gue_updated_at = (IGuest.gue_updated_at !== undefined) ? new Date(IGuest.gue_updated_at) : new Date()
        }

        return this;
    }

    // Getter and setter for gue_id
    public get gue_id(): number {
        return (this._gue_id !== undefined) ? this._gue_id : 0;
    }
    public set gue_id(value: number) {
        this._gue_id = value;
    }

    // Getter and setter for gue_name
    public get gue_name(): string {
        return (this._gue_name !== undefined) ? this._gue_name : "";
    }
    public set gue_name(value: string) {
        this._gue_name = value;
    }

    // Getter and setter for gue_last_name
    public get gue_last_name(): string {
        return this._gue_last_name;
    }
    public set gue_last_name(value: string) {
        this._gue_last_name = value;
    }

    // Getter and setter for gue_full_name
    public get gue_full_name(): string {
        return this._gue_full_name;
    }
    public set gue_full_name(value: string) {
        this._gue_full_name = value;
    }

    // Getter and setter for gue_identity_document
    public get gue_identity_document(): string {
        return this._gue_identity_document;
    }
    public set gue_identity_document(value: string) {
        this._gue_identity_document = value;
    }

    // Getter and setter for gue_email
    public get gue_email(): string {
        return this._gue_email;
    }
    public set gue_email(value: string) {
        this._gue_email = value;
    }

    // Getter and setter for gue_phone_number
    public get gue_phone_number(): string {
        return this._gue_phone_number;
    }
    public set gue_phone_number(value: string) {
        this._gue_phone_number = value;
    }

    // Getter and setter for gue_birthday
    public get gue_birthday(): string {
        return this._gue_birthday;
    }
    public set gue_birthday(value: string) {
        this._gue_birthday = value;
    }

    // Getter and setter for gue_age
    public get gue_age(): number {
        return this._gue_age;
    }
    public set gue_age(value: number) {
        this._gue_age = value;
    }

    // Getter and setter for gue_created_at
    public get gue_created_at(): Date {
        return this._gue_created_at;
    }
    public set gue_created_at(value: Date) {
        this._gue_created_at = value;
    }

    // Getter and setter for gue_updated_at
    public get gue_updated_at(): Date {
        return this._gue_updated_at;
    }
    public set gue_updated_at(value: Date) {
        this._gue_updated_at = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): GuestInterface {
        return {
            gue_id: this.gue_id,
            gue_name: this.gue_name,
            gue_last_name: this.gue_last_name,
            gue_full_name: this.gue_full_name,
            gue_identity_document: this.gue_identity_document,
            gue_email: this.gue_email,
            gue_phone_number: this.gue_phone_number,
            gue_birthday: this.gue_birthday,
            gue_age: this.gue_age,
            gue_created_at: this.gue_created_at,
            gue_updated_at: this.gue_updated_at
        };
    }

    public validate(): boolean {

        if (!this.gue_name || this.gue_name.trim() === '') {
            this.addMessage('Guest name is required')
        }
        if (!this.gue_last_name || this.gue_last_name.trim() === '') {
            this.addMessage('Last name is required')
        }

        if (this.gue_birthday.trim() !== '' && isValidDOB(this.gue_birthday) === false) {
            this.addMessage('Date of birth is invalid')
        }

        if (this.gue_phone_number.trim() !== '' && isValidPositiveInteger(this.gue_phone_number) === false) {
            this.addMessage('Phone number is invalid')
        }

        if (this.gue_email.trim() !== '' && isValidEmail(this.gue_email) === false) {
            this.addMessage('Email is invalid')
        }

        if (this.showMessages().length > 0) {
            return false;
        } else {
            return true;
        }
    }

    public backUrl (urlFromRoute: string){
        let backUrlValue ="/";
        switch (urlFromRoute) {
            case "reservationCreate":
                backUrlValue = "/reservation/create";
                break;
            case "reservationEdit":
                backUrlValue = "/reservation/edit";
                break;
            case "guest":
                backUrlValue = "/guest";
                break;
        }

        return backUrlValue;
    }

}