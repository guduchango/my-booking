import './reservation.css'
import {useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import {useGlobalContext } from "../../Context/Context";
import { NavLink } from "react-router-dom";
import { ReservationStorageService } from '../../Services/Reservation/ReservationStorageService';
import { ReservationInterface } from '../../Models/Reservation/ReservationInterface';


export const Reservation: React.FC = () => {

    const [reservations, setReservations] = useState<ReservationInterface[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const getReservations = async () => {
        const storageReservationService = new ReservationStorageService()
        const storageReservations = await storageReservationService.getAll();
        setReservations(storageReservations);
    }
    
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    // const clickReservation = (reservation: ReservationInterface) => {
    //     console.log(reservation.res_beds)
    // };

    useEffect(() => {
        console.log('getReservation')
        getReservations();
      },[]);

    return (
        <Layout>
            <div className="filter-wrapper">
                <div className="filter-icons">
                    {showFilter && (
                        <a onClick={closeFilter}>
                            <i className="icon-cross"></i>
                        </a>
                    )}
                    {!showFilter && (
                        <a onClick={openFilter}>
                            <i className="icon-search"></i>
                        </a>
                    )}
                </div>
                <div className="filter-input">
                    {showFilter && (
                        <div className="showBox">
                            <input placeholder="Buscar...."></input>
                        </div>
                    )}
                </div>
            </div>
            <div className="table">
                {reservations.map((reservation) => (
                    <div key={reservation.res_id} className="table-row" >
                        <div className="tableRow-wrapper">
                            <p className="tableRow-title">{reservation.guest.gue_name + " " + reservation.guest.gue_last_name}</p>
                            <p>{reservation.res_beauty_dates}</p>
                            <p>{reservation.res_nights} nights</p>
                            <p>{reservation.res_adults} adults, {reservation.res_children} children</p>
                            <p>{reservation.unit.uni_name}</p>
                        </div>
                        <div  className="tableRow-button-detail">
                        <NavLink
                            to='/reservation/details'
                            state={{ res_id: reservation.res_id }}
                            >
                             <i className="icon-equalizer"></i> 
                        </NavLink>
                        
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    )
}