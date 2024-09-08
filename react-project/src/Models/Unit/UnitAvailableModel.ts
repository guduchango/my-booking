import { AxiosError } from "axios";
import axiosClient from "../../Api/axiosClient";
import { BaseModel } from "../BaseModel";
import { UnitAvailableInterface } from "./UnitAvailableInterface";
import { UnitInterface } from "./UnitInterface";
import { z } from 'zod';
import { validateReservationDates } from "../../Utils/GeneralFunctions";

export class UnitAvailableModel extends BaseModel implements UnitAvailableInterface {
    private _check_in: string;
    private _check_out: string;
    private _people: number;

    public constructor(IUnitAvailable?: UnitAvailableInterface) {
        super();
        const today = new Date().toISOString().split('T')[0];
        if (IUnitAvailable !== undefined) {
            this.check_in = (IUnitAvailable.check_in !== undefined) ? IUnitAvailable.check_in : today
            this.check_out = (IUnitAvailable.check_out !== undefined) ? IUnitAvailable.check_out : today
            this.people = (IUnitAvailable.people !== undefined) ? IUnitAvailable.people : 0
        }
        return this;
    }

    // Getter and Setter for check_in
    public get check_in(): string {
        return this._check_in;
    }

    public set check_in(value: string) {
        this._check_in = value;
    }

    // Getter and Setter for check_out
    public get check_out(): string {
        return this._check_out;
    }

    public set check_out(value: string) {
        this._check_out = value;
    }

    // Getter and Setter for people
    public get people(): number {
        return this._people;
    }

    public set people(value: number) {
        this._people = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): UnitAvailableInterface {
        return {
            check_in: this.check_in,
            check_out: this.check_out,
            people: this.people,
        };
    }

    public async checkAvailable(): Promise<UnitInterface[] | AxiosError> {
        return await axiosClient.post(`/unit/units-available/`, this.toPlainObject())
            .then(response => {
                return response.data.data as UnitInterface[]
            })
            .catch((error: AxiosError) => {
                const items = error.response?.data?.errors;
                if (items && items.length > 0) {
                    for (let i = 0; i < items.length; i++) {
                        this.addMessage(items[i])
                    }
                } else {
                    this.addMessage(error.message)
                }
                this.addMessage(error.message)
                return error
            });
    }

    public validate(): boolean {

        this.cleanMessages()

        try {
            if(!validateReservationDates(this.check_in, this.check_out)){
                this.addMessage('Error range days')
            }

        } catch (error) {
            this.addMessage(`${error}`)
        }

        const FormSchema = z.object({
            people: z.number().positive()
        });

        type FormData = z.infer<typeof FormSchema>;

        // Validation
        try {
            console.log("toPlainObject", this.toPlainObject());
            
            const data: FormData = FormSchema.parse(this.toPlainObject());
            console.log("data", data);
        } catch (error) {
            if (error instanceof z.ZodError) {

                for (const issue of error.issues) {
                    const messageTxt = issue.path[0] + ":" + issue.message;
                    this.addMessage(messageTxt.toLowerCase())
                }
            } else {
                this.addMessage(`${error}`)
            }
        }

        if (this.showMessages().length > 0) {
            return false;
        } else {
            return true;
        }

    }
}