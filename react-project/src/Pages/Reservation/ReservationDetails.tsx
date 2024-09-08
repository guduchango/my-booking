import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-details.css'
import { useGlobalContext } from "../../Context/Context";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { useEffect } from "react";
import { getFriendlyDate, getPercentajeByValue } from "../../Utils/GeneralFunctions";

export const ReservationDetails = () => {

    const { reservation, setReservation, guest, setGuest, unit, setUnit } = useGlobalContext()
    const location = useLocation();
    const resId = location.state.res_id;

    const getReservation = async () => {
        const storageReservationService = new ReservationStorageService()
        const storageReservation = await storageReservationService.getById(resId);
        console.log("res_id",resId)
        console.log("storageReservation",storageReservation)
        setReservation(storageReservation);
        setGuest(storageReservation.guest)
        setUnit(storageReservation.unit)
        console.log(reservation)
    }

    useEffect(() => {
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
                <div className="reservationDetails-header">
                    <div className="reservationDetails-header-left">
                        <h1>{guest.gue_full_name}</h1>
                        <h1>{unit.uni_name}</h1>
                    </div>
                    <div className="reservationDetails-header-right">
                        <h1 className="headerTitle-status">{reservation.res_status?.toUpperCase() || ""}</h1>
                    </div>
                </div>
                
                <div className="reservationDetails-header-subtitle">
                    <p><i className="icon-enter" />&nbsp;{getFriendlyDate(reservation.res_start_date)}</p>
                    <p><i className="icon-exit" />&nbsp;{getFriendlyDate(reservation.res_end_date)}</p>
                    <p><i className="icon-users" />&nbsp;{reservation.res_adults}</p>
                    <p><i className="icon-sun" />&nbsp;{reservation.res_nights}</p>
                </div>

                <div className="reservationPriceDetail-wrapper">
                    <div className="reservationPriceDetail">
                        <p>Price: <span className="priceBold">{`$${reservation.res_price}`}</span></p>
                        <p className="headerTitle-price">Total ({`${getPercentajeByValue(reservation.res_price,reservation.res_price_final)}%`}): <span className="priceBold">{`$${reservation.res_price_final}`}</span></p>
                    </div>
                    <div className="reservationAdvanceDetail">
                        <p> <i className="icon-checkmark"></i> Advance {`(${getPercentajeByValue(reservation.res_price_final,reservation.res_advance_payment)}%):`} <span className="priceBold">${reservation.res_advance_payment}</span></p>
                    </div>
                    <div className="reservationAdvanceDetail">
                        <p> <i className="icon-gift"></i> Promotion {`(${reservation.promotion.pro_name})`} <span className="priceBold">{reservation.promotion.pro_value}%</span></p>
                    </div>
                </div>

                <div className="reservationDetailsBody-guest">
                    <div className="reservationDetailsBody-field">
                        <p>Phone</p>
                        <p>{guest.gue_phone_number}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>Email</p>
                        <p>{guest.gue_email}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>Channel</p>
                        <p>{reservation.res_channel}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>Adults</p>
                        <p>{reservation.res_adults}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>Children</p>
                        <p>{reservation.res_children}</p>
                    </div>
                    <div className="reservationDetailsBody-field">
                        <p>Beds</p>
                        <p>{reservation.res_beds}</p>
                    </div>
                </div>
                <div className="reservationDetails-footer">
                    <p>Comments:</p>
                    <p>{reservation.res_comments}</p>
                </div>
            </div>


            <div className="editDetail-button-wrapper">
                <NavLink
                    to='/reservation/edit'
                    state={{ res_id: reservation.res_id }}
                >

                    <button className="editDetail-button">Edit</button>


                </NavLink>
            </div>

        </Layout>

    )
}