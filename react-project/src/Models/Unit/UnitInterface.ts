import { PriceStorageService } from "../../Services/Price/PriceStorageService";

export interface UnitInterface {
        uni_id: number;
        uni_name: string;
        uni_max_people: number;
        uni_single_bed: number;
        uni_dobule_bed: number;
        uni_rooms: number;
        uni_created_at: Date;
        uni_updated_at: Date;
}

export interface UnitAvailableRequestInterface {
    check_in: string,
    check_out: string,
    people: number;
}

export interface UnitPriceInterface {
    upri_uni_id: number;
    upri_name: string;
    upri_max_people: number;
    upri_single_bed: number;
    upri_dobule_bed: number;
    upri_rooms: number;
    upri_check_in: string,
    upri_check_out: string,
    upri_people: number;
    upri_price: number;
    upri_night: number;
}


export class UnitPriceCalculate {
    // Properties
    private unit: UnitInterface;
    private checkIn: string
    private checkOut: string;
    private people: number;
  
    // Constructor to initialize the properties
    constructor(unit: UnitInterface, checkIn: string, checkOut: string, people: number) {
      this.unit = unit;
      this.checkIn = checkIn;
      this.checkOut = checkOut;
      this.people = people;
    }


    public async getUnitPriceInfo(): Promise<UnitPriceInterface> {
        const unitPrice: UnitPriceInterface = {} as UnitPriceInterface;
        unitPrice.upri_uni_id = this.unit.uni_id
        unitPrice.upri_name = this.unit.uni_name
        unitPrice.upri_max_people = this.unit.uni_max_people
        unitPrice.upri_single_bed = this.unit.uni_single_bed
        unitPrice.upri_dobule_bed = this.unit.uni_dobule_bed
        unitPrice.upri_max_people = this.unit.uni_max_people
        unitPrice.upri_rooms = this.unit.uni_rooms
        unitPrice.upri_check_in = this.checkIn
        unitPrice.upri_check_out = this.checkOut
        unitPrice.upri_people = this.people
        unitPrice.upri_price = await this.calculatePrice();


        return unitPrice;
    }

    private calculatePrice() {
        const priceStorageService = new PriceStorageService()
        return priceStorageService.calculateTotal(this.unit.uni_id,this.checkIn,this.checkOut)
    }
  }
