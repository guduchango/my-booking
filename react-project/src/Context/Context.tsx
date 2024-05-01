
import { createContext, useEffect, useState } from 'react';
import { ReservationInterface } from '../Models/Reservation/ReservationInterface.ts';
import { ReservationHttpService } from '../Services/Reservation/ReservationHttpService.ts';
import { ReservationStorageService } from '../Services/Reservation/ReservationStorageService.ts';

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
    const httpService = new ReservationHttpService();
    const storageService  = new ReservationStorageService();
    const data = await httpService.getReservations('/reservation')

    for(const item of data ){
      item.guest = "";
      item.unit = "";
      console.log(item)
      storageService.create(item)
    }
    // console.log(array);
    // //console.log(array.map(x => (x));
  



    
        
  
    

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