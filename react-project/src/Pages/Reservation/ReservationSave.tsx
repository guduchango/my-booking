import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-edit.css'
import { FormEvent, useEffect, useState } from "react";
import { getCurrentDate, newObj, upperCaseFirst } from "../../Utils/GeneralFunctions";
import { adults, beds, channels, children, status } from "../../Utils/StaticData";
import Select from "react-select";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";
import { Channel, ReservationInterface, Status } from "../../Models/Reservation/ReservationInterface";
import { ReservationStorageService } from "../../Services/Reservation/ReservationStorageService";
import { ReservationHttpService } from "../../Services/Reservation/ReservationHttpService";



export const ReservationSave = () => {
  const location = useLocation()
  const { state } = location
  const resId = state.res_id;
  const [reservation, setReservation] = useState<ReservationInterface>(newObj<ReservationInterface>);
  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [guests, setGuests] = useState<GuestInterface[]>([]);


  const setReservationFromCreate = async () => {
    console.log("resId chango",resId)
    if (resId===0) {
      const reservationDefault: ReservationInterface = {} as ReservationInterface;
      reservationDefault.res_start_date = getCurrentDate();
      reservationDefault.res_end_date = getCurrentDate();
      reservationDefault.res_adults = 1;
      reservationDefault.res_children = 1;
      reservationDefault.res_beds = 1;
      reservationDefault.res_status = Status.pending;
      reservationDefault.res_channel = Channel.direct;
      reservationDefault.res_comments = "";
      reservationDefault.res_uni_id = 1;
      reservationDefault.res_gue_id = 1;
      console.log("default",reservationDefault)
      setReservation(reservationDefault);
      console.log("defaultObj",reservationDefault)
    }else{
      const storageReservationService = new ReservationStorageService()
      const storageReservation = await storageReservationService.getById(resId);
      setReservation(storageReservation);
      console.log("storage",storageReservation)
    }
  }

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

  const guestItems = guests.map(item => ({
    value: item.gue_id,
    label: item.gue_full_name
  }));

  const unitsItems = units.map(item => ({
    value: item.uni_id,
    label: item.uni_name
  }));

  const onClickSave = async () => {
    const reservationHttpService =  new ReservationHttpService()
    const reservationResponse = await reservationHttpService.storeReservation(reservation)
    const reservationStorageService = new ReservationStorageService();
    await reservationStorageService.create(reservationResponse)
  };

  useEffect(() => {
    setReservationFromCreate();
    getGuests()
    getUnits();
    //getReservation();
    //setReservation(reservation)
  }, []);

  return (
    <Layout>
      <div className="page-back">
        <div className="pageback-wrapper">
          <h1>Reservation save</h1>
          <NavLink
            to={resId!==0 ? '/reservation/details' : '/reservation/'}
            state={{ res_id: resId }}
          >
            <i className="icon-arrow-left"></i>
          </NavLink>
        </div>
      </div>
      <div className="reservation-edit">
          <div className="field-group">
            <div className="fieldGroup-title-button">
              <label>Guest</label>
              <NavLink to='/guest/save'>
                <i className="icon-plus"></i>
              </NavLink>
            </div>
            <Select
              className="guest-select"
              options={guestItems}
              onChange={(event) => setReservation({ ...reservation, res_gue_id: event?.value })}
              value={guestItems.filter((option) => (option.value === reservation.res_gue_id))}
            />
          </div>
          <div className="field-group">
            <label>Unit</label>
            <Select
              options={unitsItems}
              onChange={(event) => setReservation({ ...reservation, res_uni_id: event?.value })}
              value={unitsItems.filter((option) => (option.value === reservation.res_uni_id))}
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
            <label>Adults</label>
            <select
              name="res_adults"
              value={reservation.res_adults}
              onChange={(event) => setReservation({ ...reservation, res_adults: Number(event.target.value) })}
            >
              {adults.map((type, index) => (
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
              {children.map((type, index) => (
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
              {beds.map((type, index) => (
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
              {status.map((type, index) => (
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
              {channels.map((type, index) => (
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