import { AxiosResponse } from "axios";
import axiosClient from "../../Api/axiosClient";
import {ExpenseInterface } from "../../Models/Expense/ExpenseInterface";

export class ExpenseHttpService {

    readonly url: string = 'expense';

    public async getExpenses (): Promise<ExpenseInterface[]> { 
        const response: AxiosResponse<ExpenseInterface[]> = 
        await axiosClient.get<ExpenseInterface[]>(this.url);
        return response.data?.data as ExpenseInterface[];
    }
}
