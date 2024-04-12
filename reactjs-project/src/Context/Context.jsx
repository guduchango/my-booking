
import { createContext, useEffect, useState } from 'react';
import axiosClient from '../Api/axiosClient';
export const GlobalContext = createContext()

export const GlobalContextProvider = ({children}) => {

    const [reservations, setReservations] = useState([]);

    const getReservation = (url) => {
        url = url || "/reservation";
        axiosClient.get(url).then(({ data }) => {
            setReservations(data)
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