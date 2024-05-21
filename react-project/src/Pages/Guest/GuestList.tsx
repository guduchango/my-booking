import { useEffect, useState } from "react";
import Layout from "../../Components/Layout/Layout"
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { NavLink } from "react-router-dom";

export const GuestList = () => {

    const [reservations, setReservations] = useState<GuestInterface[]>([]);
    const [showFilter, setShowFilter] = useState<boolean>(false);

    const getGuests = async () => {
        const storageGuestService = new GuestStorageService()
        const storageGuests = await storageGuestService.getAll();
        setReservations(storageGuests);
    }
    
    const openFilter = () => {
        setShowFilter(true);
    };

    const closeFilter = () => {
        setShowFilter(false);
    };

    useEffect(() => {
        console.log('getGuests')
        getGuests();
      },[]);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Guests</h1>
                    <NavLink 
                    to='/guest/save'
                    state={{ gue_id: 0 }}
                    >
                        <i className="icon-plus"></i>
                    </NavLink>
                </div>
            </div>
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
                {reservations.map((guest) => (
                    <div key={guest.gue_id} className="table-row" >
                        <div className="tableRow-wrapper">
                            <p className="tableRow-title">{guest.gue_full_name}</p>
                            <p>phone: {guest.gue_phone_number}</p>
                            <p>email: {guest.gue_email}</p>
                            <p>age: {guest.gue_age}</p>
                        </div>
                        <div  className="tableRow-button-detail">
                        <NavLink
                            to='/guest/save'
                            state={{ gue_id: guest.gue_id }}
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