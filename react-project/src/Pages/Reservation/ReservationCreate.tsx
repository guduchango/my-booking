import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import { UnitInterface, UnitPriceInterface } from "../../Models/Unit/UnitInterface";
import { Channel, ReservationInterface, Status } from "../../Models/Reservation/ReservationInterface";
import { useEffect, useMemo, useState } from "react";
import { daysBetween, getFriendlyDate, toFix, upperCaseFirst } from "../../Utils/GeneralFunctions";
import Select from "react-select";
import { res_adults, res_advances, res_beds, res_channels, res_children } from "../../Utils/StaticData";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { useGlobalContext } from "../../Context/Context";
import { ReservationHttpService } from "../../Services/Reservation/ReservationHttpService";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { PromotionStorageService } from "../../Services/Promotion/PromotionStorageService";
import { PromotionInterface } from "../../Models/Promotion/PromotionInterface";

export const ReservationCreate = () => {

    const location = useLocation()
    const { state } = location
    const unitPrice = state?.unitPrice as UnitPriceInterface;
    const { reservation, setReservation, isReservationSeted, setIsReservationSeted,guest } = useGlobalContext()
    const [guests, setGuests] = useState<GuestInterface[]>([]);
    const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
    const [proValue, setProValue] = useState<number>(0);
    const [advance, setAdvance] = useState<number>(0)
    const navigate = useNavigate();

    const getGuests = async () => {
        const guestStorageService = new GuestStorageService()
        const guestStorage = await guestStorageService.getAll();
        setGuests(guestStorage)
    }

    const getPromotions = async () => {
        const promotionStorageService = new PromotionStorageService()
        const promotionsStorage = await promotionStorageService.getAll();
        const promotionStorage = await promotionStorageService.getById(1);
        reservation.promotion = promotionStorage as PromotionInterface;
        setPromotions(promotionsStorage)
    }

    const guestItems = guests.map(item => ({
        value: item.gue_id,
        label: item.gue_full_name
    }));

    const setInfo = async() => {
        const unitObj = {} as UnitInterface
        if (isReservationSeted === false) {
            reservation.res_start_date = unitPrice.upri_check_in
            reservation.res_end_date = unitPrice.upri_check_out
            reservation.res_adults = unitPrice.upri_people
            reservation.res_children = 0;
            reservation.res_beds = unitPrice.upri_people;
            reservation.res_nights = unitPrice.upri_night;
            reservation.res_children = 0;
            reservation.res_status = Status.approved;
            reservation.res_channel = Channel.direct;
            reservation.res_comments = "";
            reservation.res_uni_id = unitPrice.upri_uni_id;
            reservation.res_gue_id = 1;
            reservation.res_pro_id = 1;
            reservation.res_price = unitPrice.upri_price;
            reservation.res_advance_payment = 0;
            reservation.unit = unitObj;
            reservation.unit.uni_name = unitPrice.upri_name;
        }

        if(guest.gue_id !== 0){
            reservation.res_gue_id = guest.gue_id;
        }

        setReservation(reservation);
        setIsReservationSeted(true)
    }

    const calculatePrice = () => {
        const price = reservation.res_price
        const finalPrice = price - (proValue * 0.01 * price)
        reservation.res_price_final = finalPrice;
        const finalAdvance = (advance * 0.01 * finalPrice)
        reservation.res_advance_payment = finalAdvance
        const promotionItem = promotions.find(promotion => promotion.pro_value === proValue);
        reservation.res_pro_id = promotionItem?.pro_id || 0
        reservation.res_nights = daysBetween(reservation.res_start_date,reservation.res_end_date)
        setReservation(reservation);
    }

    const onClickSave = async () => {
        const reservationHttpService = new ReservationHttpService()
        const reservationStorageService = new ReservationStorageService();
        let reservationResponse: ReservationInterface = {} as ReservationInterface;
        reservationResponse = await reservationHttpService.storeReservation(reservation)
        await reservationStorageService.create(reservationResponse)
        navigate("/reservation");
    };

    useMemo(() => {
        setInfo()
    },[])

    useEffect(() => {
        getPromotions()
        getGuests()
        calculatePrice()
    }, [reservation,advance,proValue]);

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Reservation create</h1>
                    <NavLink
                        to={'/reservation/available-units'}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div className="save-form">
                <div className="field-group">
                    <div className="tableRow-header">
                        <h1>{reservation.unit.uni_name.toLocaleUpperCase()}</h1>
                        <h1 className="headerTitle-status">{reservation.res_status.toLocaleUpperCase()}</h1>

                    </div>
                    <div className="tableRow-header">
                        <p><i className="icon-enter" /> {getFriendlyDate(reservation.res_start_date)}</p>
                        <p><i className="icon-exit" /> {getFriendlyDate(reservation.res_end_date)}</p>
                        <p><i className="icon-users" /> {reservation.res_adults}</p>
                    </div>
                </div>

                <div className="reservationPriceDetail-wrapper">
                    <div className="reservationPriceDetail">
                        <p>Price: <span className="priceBold">{`$${toFix(reservation.res_price)}`}</span></p>
                        <p className="headerTitle-price">Total ({`-${proValue}%`}): <span className="priceBold">{`$${toFix(reservation.res_price_final)}`}</span></p>
                    </div>
                    <div className="reservationAdvanceDetail">
                        <p> <i className="icon-checkmark"></i> Advance: <span className="priceBold">${toFix(reservation.res_advance_payment)}</span></p>
                    </div>
                </div>

                <div className="field-group">
                    <label>Promotion</label>
                    <select
                        //name="res_pro_id"
                        value={proValue || ""}
                        onChange={(event) => setProValue(Number(event.target.value))}
                    >
                        {promotions.map((obj, index) => (
                            <option value={obj.pro_value} key={index} >
                                {`${obj.pro_name} (${obj.pro_value}%)`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field-group">
                    <label>Advance</label>
                    <select
                        //name="advance"
                        value={advance || ""}
                        onChange={(event) => setAdvance(Number(event.target.value))}
                    >
                        {res_advances.map((obj, index) => (
                            <option value={obj.value} key={index} >
                                {`${obj.key}`}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="field-group">
                    <label>Guest</label>
                    <div className="fieldGroup-selectButton">
                        <div className="fieldGroupSelectButton-select">
                            <Select
                                className="guest-select"
                                options={guestItems}
                                onChange={(event) => setReservation({ ...reservation, res_gue_id: Number(event?.value) })}
                                value={guestItems.filter((option) => (option.value === reservation.res_gue_id))}
                            />
                        </div>
                        <div className="fieldGroupSelectButton-icon">
                            <NavLink
                                to='/guest/save'
                                state={{ gue_id: 0, fromPlace: 'reservationCreate' }}
                            >
                                <i className="icon-plus"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>


                <div className="field-group">
                    <label>Adults</label>
                    <select
                        name="res_adults"
                        value={reservation.res_adults || ""}
                        onChange={(event) => setReservation({ ...reservation, res_adults: Number(event.target.value) })}
                    >
                        {res_adults.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>Children</label>
                    <select
                        name="res_children"
                        value={reservation.res_children || ""}
                        onChange={(event) => setReservation({ ...reservation, res_children: Number(event.target.value) })}
                    >
                        {res_children.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>Beds</label>
                    <select
                        name="res_beds"
                        value={reservation.res_beds || ""}
                        onChange={(event) => setReservation({ ...reservation, res_beds: Number(event.target.value) })}
                    >
                        {res_beds.map((type, index) => (
                            <option value={type} key={index} >
                                {type}
                            </option>
                        ))}
                    </select>

                </div>
                <div className="field-group">
                    <label>Channel</label>
                    <select
                        name="res_channel"
                        value={reservation.res_channel || ""}
                        onChange={(event) => setReservation({ ...reservation, res_channel: event.target.value })}
                    >
                        {res_channels.map((type, index) => (
                            <option value={type} key={index} >
                                {upperCaseFirst(type)}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="field-group">
                    <label>Comments</label>
                    <textarea
                        rows={6}
                        name="res_comments"
                        onChange={(event) => setReservation({ ...reservation, res_comments: event.target.value })}
                        value={reservation.res_comments}
                    >
                    </textarea>
                </div>
                <div className="field-group">
                    <button onClick={onClickSave} className="fieldGroup-button-save" >Save</button>
                </div>
            </div>
        </Layout>

    )

}
