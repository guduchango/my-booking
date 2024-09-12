import { AxiosError } from "axios";
import axiosClient from "../../Api/axiosClient";
import { BaseModel } from "../BaseModel";
import { UnitInterface } from "./UnitInterface";
import { z } from 'zod';
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";

export class UnitModel extends BaseModel implements UnitInterface {

    private _uni_id: number;
    private _uni_name: string;
    private _uni_max_people: number;
    private _uni_single_bed: number;
    private _uni_double_bed: number;
    private _uni_rooms: number;
    private _uni_created_at: Date;
    private _uni_updated_at: Date;

    public constructor(IUnit?: UnitInterface) {
        super();
        if (IUnit !== undefined) {
            this.uni_id = (IUnit.uni_id !== undefined) ? IUnit.uni_id : 0
            this.uni_name = (IUnit.uni_name !== undefined) ? IUnit.uni_name : ""
            this.uni_max_people = (IUnit.uni_max_people !== undefined) ? IUnit.uni_max_people : 0
            this.uni_single_bed = (IUnit.uni_single_bed !== undefined) ? IUnit.uni_single_bed : 0
            this.uni_double_bed = (IUnit.uni_double_bed !== undefined) ? IUnit.uni_double_bed : 0
            this.uni_rooms = (IUnit.uni_rooms !== undefined) ? IUnit.uni_rooms : 1
            this.uni_created_at = (IUnit.uni_created_at !== undefined) ? IUnit.uni_created_at : new Date()
            this.uni_updated_at = (IUnit.uni_updated_at !== undefined) ? IUnit.uni_updated_at : new Date()
        }
        return this;
    }

    // uni_id
    get uni_id(): number {
        return this._uni_id;
    }

    set uni_id(value: number) {
        this._uni_id = value;
    }

    // uni_name
    get uni_name(): string {
        return this._uni_name;
    }

    set uni_name(value: string) {
        this._uni_name = value;
    }

    // uni_max_people
    get uni_max_people(): number {
        return this._uni_max_people;
    }

    set uni_max_people(value: number) {
        this._uni_max_people = value;
    }

    // uni_single_bed
    get uni_single_bed(): number {
        return this._uni_single_bed;
    }

    set uni_single_bed(value: number) {
        this._uni_single_bed = value;
    }

    // uni_double_bed
    get uni_double_bed(): number {
        return this._uni_double_bed;
    }

    set uni_double_bed(value: number) {
        this._uni_double_bed = value;
    }

    // uni_rooms
    get uni_rooms(): number {
        return this._uni_rooms;
    }

    set uni_rooms(value: number) {
        this._uni_rooms = value;
    }

    // uni_created_at
    get uni_created_at(): Date {
        return this._uni_created_at;
    }

    set uni_created_at(value: Date) {
        this._uni_created_at = value;
    }

    // uni_updated_at
    get uni_updated_at(): Date {
        return this._uni_updated_at;
    }

    set uni_updated_at(value: Date) {
        this._uni_updated_at = value;
    }

    // Method to convert instance to plain object for serialization
    public toPlainObject(): UnitInterface {
        return {
            uni_id: this.uni_id,
            uni_name:this.uni_name,
            uni_max_people:this.uni_max_people,
            uni_single_bed:this.uni_single_bed,
            uni_double_bed:this.uni_double_bed,
            uni_rooms:this.uni_rooms,
            uni_created_at:this.uni_created_at,
            uni_updated_at:this.uni_updated_at,
        };
    }

    public async store(): Promise<UnitInterface | AxiosError>{
        return await this.postPrivate(`/unit/`, this.toPlainObject())
        .then(response => {
            const responseData: UnitInterface | AxiosError =  response.data.data as UnitInterface
            if(!(responseData instanceof AxiosError)){
                new UnitStorageService().create(responseData)
            }

            return responseData;
        })
        .catch((error: AxiosError) => {
            const items = error.response?.data?.errors;
            if (items && items.length > 0){
                for (let i = 0; i < items.length; i++) {
                    this.addMessage(items[i])
                  }
            }else{
                this.addMessage(error.message)
            }
          return error
        });
    }

    public async update(id: number): Promise<UnitInterface | AxiosError>{
        return await this.putPrivate(`/unit/${id}`, this.toPlainObject())
        .then(response => {
            const responseData: UnitInterface | AxiosError =  response.data.data as UnitInterface
            if(!(responseData instanceof AxiosError)){
                new UnitStorageService().update(id,responseData)
            }

            return responseData;
        })
        .catch((error: AxiosError) => {
            const items = error.response?.data?.errors;
            if (items && items.length > 0){
                for (let i = 0; i < items.length; i++) {
                    this.addMessage(items[i])
                  }
            }else{
                this.addMessage(error.message)
            }
            
          return error
        });
    }

    public async saveOrUpdate(id: number): Promise<UnitInterface | AxiosError>{
        if(id === 0){
            return await this.store()
        }
        return await this.update(id)
    }


    public validate(): boolean {

        const FormSchema = z.object({
            uni_name: z.string().min(5),
            uni_rooms: z.number().positive(),
            uni_max_people:z.number().positive(),
            uni_single_bed:z.number().positive(),
            uni_double_bed:z.number().positive(),
          });
          
          type FormData = z.infer<typeof FormSchema>;
          
          // Validation
          try {
            const data: FormData = FormSchema.parse(this.toPlainObject());
            console.log("data",data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                
              for (const issue of error.issues) {
                const messageTxt = issue.path[0]+":"+issue.message;
                this.addMessage(messageTxt.toLowerCase())
              }
            } else {
                this.addMessage(`Unexpected error: ${error}`)
            }
          }
         
        if (this.showMessages().length > 0) {
            return false;
        } else {
            return true;
        }

    }
}



