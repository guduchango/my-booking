import { validateEmail } from "../../Utils/GeneralFunctions";
import { BaseModel } from "../BaseModel";
import { UserInterface } from "./UserInterface";

export class UserModel extends BaseModel implements UserInterface {

    private _id: number;
    private _name: string;
    private _email: string;
    private _password: string;
    private _password_confirmation: string;
    private _token: string;
    private _created_at: Date;
    private _updated_at: Date;

    constructor(IUser?: UserInterface) {
        super();
        if (IUser !== undefined) {
            this.id = (IUser.id !== undefined) ? IUser.id : 0
            this.name = (IUser.name !== undefined) ? IUser.name : ""
            this.email = (IUser.email !== undefined) ? IUser.email : ""
            this.password = (IUser.password !== undefined) ? IUser.password : ""
            this.password_confirmation = (IUser.password_confirmation !== undefined) ? IUser.password_confirmation : ""
            this.token = (IUser.token !== undefined) ? IUser.token : ""
            this.created_at = (IUser.token !== undefined) ? new Date(IUser.created_at) : new Date()
            this.updated_at = (IUser.token !== undefined) ? new Date(IUser.updated_at) : new Date()
        }
    }

    get id(): number {
        return this._id;
    }

    set id(value: number) {
        this._id = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get email(): string {
        return this._email;
    }

    set email(value: string) {
        this._email = value;
    }

    get password(): string {
        return this._password;
    }

    set password(value: string) {
        this._password = value;
    }

    get password_confirmation(): string {
        return this._password_confirmation;
    }

    set password_confirmation(value: string) {
        this._password_confirmation = value;
    }

    get token(): string {
        return this._token;
    }

    set token(value: string) {
        this._token = value;
    }

    get created_at(): Date {
        return this._created_at;
    }

    set created_at(value: Date) {
        this._created_at = value;
    }

    get updated_at(): Date {
        return this._updated_at;
    }

    set updated_at(value: Date) {
        this._updated_at = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): UserInterface {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            password: this.password,
            password_confirmation: this.password_confirmation,
            token: this.token,
            created_at: this.created_at,
            updated_at: this.updated_at,
        };
    }

    public registerValidate(): boolean {

        if (!this.name || this.name.trim() === '') {
            this.addMessage('User name is required')
        }
        if (!this.email || this.email.trim() === '' || validateEmail(this.email) === false) {
            this.addMessage('Email is invalid')
        }
        if (!this.password || this.password.trim() === '') {
            this.addMessage('Password is required')
        }
        if (!this.password_confirmation || this.password_confirmation.trim() === '') {
            this.addMessage('Password confirmation name is required')
        }

        if (this.password.length < 6) {
            this.addMessage('Password must be at least 6 characters long')
        }

        if (this.password !== this.password_confirmation) {
            this.addMessage('Password confirmation password do not match.')
        }

        if (this.showMessages().length > 0) {
            return false;
        } else {
            return true;
        }
    }

    public loginValidate(): boolean {

        
        if (!this.email || this.email.trim() === '' || validateEmail(this.email) === false) {
            this.addMessage('Email is invalid')
        }
        if (!this.password || this.password.trim() === '') {
            this.addMessage('Password is required')
        }
        if (this.password.length < 6) {
            this.addMessage('Password must be at least 6 characters long')
        }

        if (this.showMessages().length > 0) {
            return false;
        } else {
            return true;
        }
    }
    
}
