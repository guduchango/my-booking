
import { createContext, useEffect, useState } from 'react';
import axiosClient from '../Api/axiosClient';
import ReservationInterface from '../Interfaces/ReservationInterface.ts';


interface GlobalContextProps {
  reservations: ReservationInterface[];
}

type Props = {
  children?: React.ReactNode
};

export const GlobalContext = createContext<GlobalContextProps>({ reservations: [] });


export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [reservations, setReservations] = useState<ReservationInterface[]>([]);

  const getReservation = (url?: string) => {
      url = url || "/reservation";
      axiosClient.get(url).then(({ data }) => {
        console.log('aaa',data)
          setReservations(data.data)
      });
  };

  useEffect(() => {
      getReservation()
  }, []);

  return (
      <GlobalContext.Provider value={{
          reservations
      }}>
          {children}
      </GlobalContext.Provider>
  )
}