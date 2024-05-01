
import { createContext, useEffect, useState } from 'react';
import { ReservationInterface } from '../Models/Reservation/ReservationInterface.ts';
import { SyncService } from '../Services/SyncService.ts';


interface GlobalContextProps {
  guests: ReservationInterface[];
}

type Props = {
  children?: React.ReactNode
};

export const GlobalContext = createContext<GlobalContextProps>({ guests: [] });


export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [guests, setReservations] = useState<ReservationInterface[]>([]);

  const getData = async () => {
  
    const syncService = new SyncService();
    syncService.setTables();

  }
    

 
  useEffect(() => {
    
    getData();
  },[]);

  return (
    <GlobalContext.Provider value={{guests}}>
      {children}
    </GlobalContext.Provider>
  )
}