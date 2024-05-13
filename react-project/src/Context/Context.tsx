
import { createContext,useContext, useEffect, useState } from 'react';
import { GuestInterface } from '../Models/Guest/GuestInterface.ts';
import { ReservationInterface } from '../Models/Reservation/ReservationInterface.ts';
//import { ExpenseInterface } from '../Models/Expense/ExpenseInterface.ts';
//import { PriceInterface } from '../Models/Price/PriceInterface.ts';
//import { PromotionInterface } from '../Models/Promotion/PromotionInterface.ts';
import { UnitInterface } from '../Models/Unit/UnitInterface.ts';
//import { CurrencyInterface } from '../Models/Currency/CurrencyInterface.ts';
import { SyncService } from '../Services/SyncService.ts';
import { newObj } from '../Utils/GeneralFunctions.ts';

interface GlobalContextProps {
  //objects
  reservation: ReservationInterface,
  setReservation: (item: ReservationInterface) => void; 
  guest: GuestInterface,
  setGuest: (item: GuestInterface) => void; 
  unit: UnitInterface,
  setUnit: (item: UnitInterface) => void; 
  //lists
  //guests: GuestInterface[];
  //setGuests: (item: GuestInterface[]) => void;
  //reservations: ReservationInterface[];
  // setReservations: (item: ReservationInterface[]) => void
  // expenses: ExpenseInterface[];
  // setExpenses: (item: ExpenseInterface[]) => void
  // prices: PriceInterface[];
  // setPrices: (item: PriceInterface[]) => void
  // promotions: PromotionInterface[];
  // setPromotions: (item: PromotionInterface[]) => void
  // units: UnitInterface[];
  // setUnits: (item: UnitInterface[]) => void
  // currencies: CurrencyInterface[];
  // setCurrencies: (item: CurrencyInterface[]) => void
  
}

type Props = {
  children?: React.ReactNode
};

export const GlobalContext = createContext<GlobalContextProps | undefined>(
  undefined
);

export const GlobalContextProvider = ({ children }: Props) => {
  //objectLists
  // const [reservations,setReservations] = useState<ReservationInterface[]>([])
  // const [guests,setGuests] = useState<GuestInterface[]>([])
  // const [expenses,setExpenses] = useState<ExpenseInterface[]>([]);
  // const [prices,setPrices] = useState<PriceInterface[]>([]);  
  // const [promotions,setPromotions] = useState<PromotionInterface[]>([]);
  // const [units,setUnits] = useState<UnitInterface[]>([]);
  // const [currencies,setCurrencies] = useState<CurrencyInterface[]>([]);
  //Objects
  const [reservation,setReservation] = useState<ReservationInterface>(newObj<ReservationInterface>());
  const [unit,setUnit] = useState<UnitInterface>(newObj<UnitInterface>());
  const [guest,setGuest] = useState<GuestInterface>(newObj<GuestInterface>());

  const getData = async () => {
    const syncService = new SyncService();
    await syncService.setTables();
    //setReservations(syncService.getStorageReservationItems);
    //setGuests(syncService.getStorageGuestItems);
    //setExpenses(syncService.getStorageExpenseItems)
    //setPrices(syncService.getStoragePriceItems);
    //setPromotions(syncService.getStoragePromotionItems);
    //setUnits(syncService.getStorageUnitItems);
    //setCurrencies(syncService.getStorageCurrencyItems);
  }
 
  useEffect(() => {
    console.log('useEfect context provider getData()')
    getData();
  },[]);

  const contextValue: GlobalContextProps = {
    reservation,
    setReservation,
    guest,
    setGuest,
    unit,
    setUnit,
    //Set lists
    // reservations,
    // setReservations,
    // guests,
    // setGuests,
    // expenses,
    // setExpenses,
    // prices,
    // setPrices,
    // promotions,
    // setPromotions,
    // units,
    // setUnits,
    // currencies,
    // setCurrencies
    
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}


export function useGlobalContext() {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useShoppingCart must be used within a ShoppingCartProvider"
    );
  }
  return context;
}