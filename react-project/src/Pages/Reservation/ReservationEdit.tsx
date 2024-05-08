import { NavLink, useLocation } from "react-router-dom";
import Layout from "../../Components/Layout/Layout"
import './reservation-edit.css'
import { ReservationInterface, Status } from '../../Models/Reservation/ReservationInterface';
import { useEffect, useState } from "react";
import { setSelected, upperCaseFirst } from "../../Utils/GeneralFunctions";
import { adults, beds, children, status } from "../../Utils/StaticData";

export const ReservationEdit = () => {
  const location = useLocation();
  const [reservation, setReservation] = useState<ReservationInterface>(location.state.reservation);

  // useEffect(() => {
  //     console.log("chango => => ",reservation);
  //   },[reservation]);

  return (
    <Layout>
       <div className="page-back">
                <NavLink to='/reservation'>
                    <i className="icon-arrow-left"></i>
                </NavLink>
            </div>
      <div className="reservation-edit">
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
           {adults.map((type,index) => (
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
           {children.map((type,index) => (
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
            {beds.map((type,index) => (
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
            {status.map((type,index) => (
              <option value={type} key={index} >
                {upperCaseFirst(type)} 
              </option>
            ))}
          </select>
        </div>
        <div className="field-group">
          <label>Comments</label>
          <textarea rows={6}
           name="res_comments"
           value={reservation.res_comments}
          >

          </textarea>
          {/* <input
            name="res_comments"
            value={reservation.res_comments}
            type="date"
            onChange={(event) => setReservation({ ...reservation, res_end_date: event.target.value })}
          /> */}
        </div>
      </div>
    </Layout>
  )
}