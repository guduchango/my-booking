import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-edit.css'
import { useEffect, useState } from "react";
import { upperCaseFirst } from "../../Utils/GeneralFunctions";
import { adults, beds, channels, children, status } from "../../Utils/StaticData";
import { useGlobalContext } from "../../Context/Context";
import Select from "react-select";
import { UnitStorageService } from "../../Services/Unit/UnitStorageService";
import { UnitInterface } from "../../Models/Unit/UnitInterface";
import { GuestInterface } from "../../Models/Guest/GuestInterface";
import { GuestStorageService } from "../../Services/Guest/GuestStorageService";

export const ReservationEdit = () => {

  const { reservation, setReservation } = useGlobalContext()

  const [units, setUnits] = useState<UnitInterface[]>([]);
  const [guests, setGuests] = useState<GuestInterface[]>([]);


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

  console.log(guestItems)

  const unitsItems = units.map(item => ({
    value: item.uni_id,
    label: item.uni_name
  }));

  console.log(reservation)


  useEffect(() => {
    setReservation(reservation)
    getGuests()
    getUnits();
  }, []);

  return (
    <Layout>
      <div className="page-back">
        <div className="pageback-wrapper">
          <h1>Reservation edit</h1>
          <NavLink
            to='/reservation/details'
            state={{ res_id: reservation.res_id }}
          >
            <i className="icon-arrow-left"></i>
          </NavLink>
        </div>
      </div>
      <div className="reservation-edit">
        <div className="field-group">
          <div className="fieldGroup-title-button">
            <label>Guest</label>
            <NavLink to='/guest/create'>
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
      </div>
    </Layout>
  )
}