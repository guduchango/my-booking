import './reservation.css'
import {useState } from "react";
import Layout from "../../Components/Layout/Layout"
import {useGlobalContext } from "../../Context/Context";
import { NavLink } from "react-router-dom";


export const Reservation: React.FC = () => {

    const {reservations} = useGlobalContext();

    const [showFilter, setShowFilter] = useState<boolean>(false);
    
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    // const clickReservation = (reservation: ReservationInterface) => {
    //     console.log(reservation.res_beds)
    // };

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
                            state={{ reservation: reservation }}
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