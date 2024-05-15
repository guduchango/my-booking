import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-details.css'
import { useGlobalContext } from "../../Context/Context";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { useEffect } from "react";

export const ReservationDetails = () => {

    const { reservation, setReservation, guest, setGuest, unit, setUnit } = useGlobalContext()
    const location = useLocation();
    const resId = location.state.res_id;

    const getReservation = async () => {
        const storageReservationService = new ReservationStorageService()
        const storageReservation = await storageReservationService.getById(resId);
        setReservation(storageReservation);
        setGuest(storageReservation.guest)
        setUnit(storageReservation.unit)
    }

    useEffect(() => {
        console.log('useEfect context provider getData()')
        getReservation();
    }, []);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Reservation details</h1>
                    <NavLink to='/reservation'>
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div className="table-reservationDetails">
                <div className="table-reservationDetails-right">
                    <p className="table-reservationDetails-title">Name</p>
                    <p>{guest.gue_name + " " + guest.gue_last_name}</p>
                    <p className="table-reservationDetails-title">Years</p>
                    <p>{guest.gue_age}</p>
                    <p className="table-reservationDetails-title">Check-In</p>
                    <p>{reservation.res_start_date}</p>
                    <p className="table-reservationDetails-title">Nights</p>
                    <p>{reservation.res_nights}</p>
                    <p className="table-reservationDetails-title">Adults</p>
                    <p>{reservation.res_adults}</p>
                    <p className="table-reservationDetails-title">Status</p>
                    <p>{reservation.res_status}</p>
                    <p className="table-reservationDetails-title">Pay advance</p>
                    <p>{reservation.res_advance_payment}</p>
                    <p className="table-reservationDetails-title">Price</p>
                    <p>{reservation.res_price_final}</p>
                </div>
                <div className="table-left">
                    <p className="table-reservationDetails-title">Phone</p>
                    <p>{guest.gue_phone_number}</p>
                    <p className="table-reservationDetails-title">Email</p>
                    <p>{guest.gue_email}</p>
                    <p className="table-reservationDetails-title">Check-Out</p>
                    <p>{reservation.res_end_date}</p>
                    <p className="table-reservationDetails-title">Aparment</p>
                    <p>{unit.uni_name}</p>
                    <p className="table-reservationDetails-title">Children</p>
                    <p>{reservation.res_children}</p>
                    <p className="table-reservationDetails-title">Channel</p>
                    <p>{reservation.res_channel}</p>
                    <p className="table-reservationDetails-title">Discount</p>
                    <p>{reservation.res_discount_value}</p>
                    <p className="table-reservationDetails-title">Price dolar</p>
                    <p>{reservation.res_price_dolar}</p>
                </div>
            </div>

            <div className="page-edit">
                <NavLink
                    to='/reservation/edit'
                    state={{ res_id: reservation.res_id }}
                >
                    <i className="icon-pencil"></i>
                </NavLink>
            </div>

        </Layout>

    )
}