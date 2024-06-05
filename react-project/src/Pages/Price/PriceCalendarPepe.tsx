import { Calendar, momentLocalizer, Event, Views } from 'react-big-calendar';
import moment from 'moment';

// Import the default CSS for the calendar
import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer by providing the moment Object to the correct localizer.
const localizer = momentLocalizer(moment);

// Define the type for the event
interface CalendarEvent extends Event {
    title: string;
    start: Date;
    end: Date;
}


import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Layout from '../../Components/Layout/Layout'



export const PriceCalendarPepe = () => {
    // Define some sample events
    const events: CalendarEvent[] = [
        {
            title: 'Meeting',
            start: new Date(2024, 0, 1), // May 1, 2024, 10:00 AM
            end: new Date(2024, 0, 1),   // May 1, 2024, 12:00 PM
        },
        {
            title: 'Lunch',
            start: new Date(2024, 0, 2), // May 2, 2024, 12:00 PM
            end: new Date(2024, 0, 2),   // May 2, 2024, 1:00 PM
        },
        {
            title: 'Conference',
            start: new Date(2024, 6, 3),        // May 3, 2024, All day
            end: new Date(2024, 6, 5),          // May 5, 2024, All day
        },
    ];




    return (
        <Layout>
            <div style={{ height: '500px' }}>
                <Calendar
                    localizer={localizer}
                    events={events}
                    startAccessor="start"
                    endAccessor="end"
                    defaultView={Views.MONTH}
                    style={{ height: 500 }}
                />
            </div>
        </Layout>


    )
}




