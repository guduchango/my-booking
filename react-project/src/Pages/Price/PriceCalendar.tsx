import { NavLink, useLocation } from "react-router-dom"
import Layout from "../../Components/Layout/Layout"
import { useEffect, useState } from "react";
import { CalendarEvent, PriceInterface, PriceRageInterface } from "../../Models/Price/PriceInterface";
import { newObj } from "../../Utils/GeneralFunctions";
import { PriceHttpService } from "../../Services/Price/PriceHttpService";
import { PriceStorageService } from "../../Services/Price/PriceStorageService";
import { Calendar, momentLocalizer, Event, Views } from 'react-big-calendar';
import moment from 'moment';
import './price-calendar.css'
// Import the default CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'

export const PriceCalendar = () => {

    const [priRange, setPriRange] = useState<PriceRageInterface>(newObj<PriceRageInterface>);
    const [dayPrices, setDayPrices] = useState<CalendarEvent[]>([]);
    
    const location = useLocation()
    const { state } = location
    const uniId = state.uni_id;

    const startEvents = async() => {
        const priceStorageService = new PriceStorageService();
        const priceEvents = await priceStorageService.getPriceUnitEvent(uniId)
        setDayPrices(priceEvents)
    }


    useEffect(() => {
        startEvents();
    }, []);


    const onClickSave = async () => {
        const priceHttpService = new PriceHttpService()
        priRange.pri_uni_id = uniId;
        const priceStorageService = new PriceStorageService();
        const priceResponse: PriceInterface[] = await priceHttpService.storeRangePrice(priRange)
        for (const price of priceResponse) {
            await priceStorageService.createOrUpdate(price)
        }
        startEvents()
    };

    return (
        <Layout>
            <div className="page-back">
                <div className="pageback-wrapper">
                    <h1>Unit Prices</h1>
                    <NavLink
                        to='/unit/save'
                        state={{ uni_id: uniId }}
                    >
                        <i className="icon-arrow-left"></i>
                    </NavLink>
                </div>
            </div>
            <div className="price-calendar">
            <Calendar
                    localizer={localizer}
                    events={dayPrices}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={Views.MONTH}
                    style={{ height: 500 }}
                />
            </div>
        
            <div className="save-form">
                <div className="field-group">
                    <label>Price</label>
                    <input
                        type="string"
                        value={priRange.pri_value}
                        onChange={(event) => setPriRange({ ...priRange, pri_value: Number(event.target.value) })}
                    />
                </div>
                <div className="field-group">
                    <label>From</label>
                    <input
                        type="date"
                        value={priRange.pri_from}
                        onChange={(event) => setPriRange({ ...priRange, pri_from: event.target.value })}
                    />
                </div>
                <div className="field-group">
                    <label>To</label>
                    <input
                        type="date"
                        value={priRange.pri_to}
                        onChange={(event) => setPriRange({ ...priRange, pri_to: event.target.value })}
                    />
                </div>

                <div className="field-group">
                    <button className="fieldGroup-button-save" onClick={onClickSave}>Save</button>
                </div>
            </div>

        </Layout>
    )
}