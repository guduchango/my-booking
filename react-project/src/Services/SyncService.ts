import { CurrencyHttpService } from "./Currency/CurrencyHttpService";
import { CurrencyStorageService } from "./Currency/CurrencyStorageService";
import { ExpenseStorageService } from "./Expense/ExpenseStorageService";
import { ExpenseHttpService } from "./Expense/ExpensetHttpService";
import { GuestHttpService } from "./Guest/GuestHttpService";
import { GuestStorageService } from "./Guest/GuestStorageService";
import { PriceStorageService } from "./Price/PriceStorageService";
import { PriceHttpService } from "./Price/PricetHttpService";
import { PromotionStorageService } from "./Promotion/PromotionStorageService";
import { PromotionHttpService } from "./Promotion/PromotiontHttpService";
import { ReservationHttpService } from "./Reservation/ReservationHttpService";
import { ReservationStorageService } from "./Reservation/ReservationStorageService";
import { UnitHttpService } from "./Unit/UnitHttpService";
import { UnitStorageService } from "./Unit/UnitStorageService";

export class SyncService {

    async setTables(){

        const unitHttpService = new UnitHttpService();
        const expenseHttpService = new ExpenseHttpService();
        const currencyHttpService = new CurrencyHttpService();
        const reservationHttpService = new ReservationHttpService();
        const guestHttpService  = new GuestHttpService();
        const promotionHttpService  = new PromotionHttpService();
        const priceHttpService = new PriceHttpService();

        const unitStorageService = new UnitStorageService();
        const expenseStorageService = new ExpenseStorageService();
        const currencyStorageService = new CurrencyStorageService();
        const reservationStorageService = new ReservationStorageService();
        const guestStorageService = new GuestStorageService();
        const promotionStorageService = new PromotionStorageService();
        const priceStorageService = new PriceStorageService();

        const httpUnitItems = await unitHttpService.getUnits();
        for(const item of httpUnitItems ){
            console.log(item)
            await unitStorageService.create(item)
        }

        const httpExpenseItems = await expenseHttpService.getExpenses();
        for(const item of httpExpenseItems ){
            console.log(item)
            await expenseStorageService.create(item)
        }

        const httpCurrencyItems = await currencyHttpService.getCurrencys();
        for(const item of httpCurrencyItems ){
            console.log(item)
            await currencyStorageService.create(item)
        }

        const httpReservationItems = await reservationHttpService.getReservations();
        for(const item of httpReservationItems ){
            console.log(item)
            await reservationStorageService.create(item)
        }

        const httpGuestItems = await guestHttpService.getGuests();
        for(const item of httpGuestItems ){
            console.log(item)
            await guestStorageService.create(item);
        }

        const httpPromotionItems = await promotionHttpService.getPromotions();
        for(const item of httpPromotionItems ){
            console.log(item)
            await promotionStorageService.create(item);
        }

        const httpPriceItems = await priceHttpService.getPrices();
        for(const item of httpPriceItems ){
            console.log(item)
            await priceStorageService.create(item)
        }
    }

}