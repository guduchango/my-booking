import { NavLink, useLocation, useNavigate } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-edit.css'
import { useEffect, useState } from "react";
import { daysBetween, getPercentajeByValue, upperCaseFirst } from "../../Utils/GeneralFunctions";
import { res_adults, res_beds, res_channels, res_children, res_status } from "../../Utils/StaticData";
import Select from "react-select";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { ReservationInterface } from "../../Models/Reservation/ReservationInterface";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { ReservationHttpService } from "../../Services/Reservation/ReservationHttpService";
import { useGlobalContext } from "../../Context/Context";
import { PromotionStorageService } from "../../Services/Promotion/PromotionStorageService";
import { PromotionInterface } from "../../Models/Promotion/PromotionInterface";

export const ReservationEdit = () => {

  const location = useLocation()
  const { state } = location
  const resId = state?.res_id
  const navigate = useNavigate();
  const { reservation, setReservation } = useGlobalContext()
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [guests, setGuests] = useState<GuestInterface[]>([]);
  const [promotions, setPromotions] = useState<PromotionInterface[]>([]);
  const [proValue, setProValue] = useState<number>(0);
  const [resAdvancePayment, setResAdvancePayment] = useState<number>(0)
  const [resPrice, setResPrice] = useState<number>(0)
  const [resFinalPrice, setResFinalPrice] = useState<number>(0)

  const getUnits = async () => {
    const unitStorageService = new UnitStorageService()
    const unitsStorage = await unitStorageService.getAll();
    setUnits(unitsStorage)
  }

  const getGuests = async () => {
    const guestStorageService = new GuestStorageService()
    const guestStorage = await guestStorageService.getAll();
    setGuests(guestStorage)
  }

  const getReservation = async () => {
    const storageReservationService = new ReservationStorageService()
    const storageReservation = await storageReservationService.getById(resId);
    setResPrice(storageReservation.res_price)
    setResFinalPrice(storageReservation.res_price_final)
    setResAdvancePayment(storageReservation.res_advance_payment)
    setReservation(storageReservation);
  }

  const getPromotions = async () => {
    const promotionStorageService = new PromotionStorageService()
    const storagePromotions = await promotionStorageService.getAll();
    setPromotions(storagePromotions);
  }


  const guestItems = guests.map(item => ({
    value: item.gue_id,
    label: item.gue_full_name
  }));

  const unitsItems = units.map(item => ({
    value: item.uni_id,
    label: item.uni_name
  }));

  const onClickSave = async () => {
    const reservationHttpService = new ReservationHttpService()
    const reservationStorageService = new ReservationStorageService();
    let reservationResponse: ReservationInterface = {} as ReservationInterface;
    reservation.res_price = resPrice
    reservation.res_price_final = resFinalPrice
    reservation.res_advance_payment = resAdvancePayment
    reservation.res_nights = daysBetween(reservation.res_start_date,reservation.res_end_date)
    if (resId === 0) {
      reservationResponse = await reservationHttpService.storeReservation(reservation)
      await reservationStorageService.create(reservationResponse)
    } else {
      reservationResponse = await reservationHttpService.updateReservation(reservation, resId)
      console.log("reservation-local",reservation)
      await reservationStorageService.update(resId, reservationResponse)
      console.log("reservation-api",reservationResponse)
    }

    navigate("/reservation");
  };



  useEffect(() => {
    getReservation();
    getGuests()
    getUnits();
    getPromotions();
  }, []);

  return (
    <Layout>
      <div className="page-back">
        <div className="pageback-wrapper">
          <h1>Reservation save</h1>
          <NavLink
            to={resId !== 0 ? '/reservation/details' : '/reservation/'}
            state={{ res_id: resId }}
          >
            <i className="icon-arrow-left"></i>
          </NavLink>
        </div>
      </div>

      <div className="save-form">
        <div className="field-group">
          <label>Guest</label>
          <div className="field-group">

            <Select
              className="guest-select"
              options={guestItems}
              onChange={(event) => setReservation({ ...reservation, res_gue_id: Number(event?.value) })}
              value={guestItems.filter((option) => (option.value === reservation.res_gue_id))}
            />

          </div>
        </div>
        <div className="field-group">
          <label>Unit</label>
          <Select
            options={unitsItems}
            onChange={(event) => setReservation({ ...reservation, res_uni_id: Number(event?.value) })}
            value={unitsItems.filter((option) => (option.value === reservation.res_uni_id))}
            isDisabled={(resId == 0) ? true : false}
          />
        </div>
        <div className="field-group">
          <label>Check-In</label>
          <input
            name="res_start_date"
            value={reservation.res_start_date}
            type="date"
            onChange={(event) => setReservation({ ...reservation, res_start_date: event.target.value })}
          />
        </div>
        <div className="field-group">
          <label>Check-Out</label>
          <input
            name="res_end_date"
            value={reservation.res_end_date}
            type="date"
            onChange={(event) => setReservation({ ...reservation, res_end_date: event.target.value })}
          />
        </div>

        <div className="field-group">
          <label>Price</label>
          <input
            //name="res_price"
            value={resPrice}
            type="number"
            onChange={(event) => setResPrice(parseFloat(event.target.value))}
          />
        </div>

        <div className="field-group">
          <label>Final Price {`(${getPercentajeByValue(resPrice, resFinalPrice)}%)`}</label>
          <input
            //name="res_price_final"
            value={resFinalPrice}
            type="number"
            onChange={(event) => setResFinalPrice(parseFloat(event.target.value))}
          />
        </div>

        <div className="field-group">
          <label>Promotions</label>
          <select
            //name="res_pro_id"
            value={proValue}
            onChange={(event) => setProValue(Number(event.target.value))}
          >
            {promotions.map((obj, index) => (
              <option value={obj.pro_id} key={index} >
                {`${obj.pro_name} (${obj.pro_value}%)`}
              </option>
            ))}
          </select>
        </div>

        <div className="field-group">
          <label>Advance {`(${getPercentajeByValue(resFinalPrice, resAdvancePayment)}%)`}</label>
          <input
            //name="res_price_final"
            value={resAdvancePayment}
            type="number"
            onChange={(event) => setResAdvancePayment(parseFloat(event.target.value))}
          />
        </div>

        <div className="field-group">
          <label>Adults</label>
          <select
            name="res_adults"
            value={reservation.res_adults}
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
            value={reservation.res_children}
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
            value={reservation.res_beds}
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
          <label>Status</label>
          <select
            name="res_status"
            value={reservation.res_status}
            onChange={(event) => setReservation({ ...reservation, res_status: event.target.value })}
          >
            {res_status.map((type, index) => (
              <option value={type} key={index} >
                {upperCaseFirst(type)}
              </option>
            ))}
          </select>

        </div>
        <div className="field-group">
          <label>Channel</label>
          <select
            name="res_channel"
            value={reservation.res_channel}
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
          <button className="fieldGroup-button-save" onClick={onClickSave} >Save</button>
        </div>
      </div>
    </Layout>
  )
}