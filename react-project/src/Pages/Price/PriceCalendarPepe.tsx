import { useCallback, useState } from 'react'
import { Calendar, dateFnsLocalizer, Event } from 'react-big-calendar'
import withDragAndDrop, { withDragAndDropProps } from 'react-big-calendar/lib/addons/dragAndDrop'
import { format } from 'date-fns/format'
import { parse } from 'date-fns/parse'
import { startOfWeek } from 'date-fns/startOfWeek'
import { getDay } from 'date-fns/getDay'
import { enUS } from 'date-fns/locale/en-US'
import { addHours } from 'date-fns/addHours'
import { startOfHour } from 'date-fns/startOfHour'

import 'react-big-calendar/lib/addons/dragAndDrop/styles.css'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import Layout from '../../Components/Layout/Layout'
import Modal from '../../Modal/Modal'

const locales = {
    'en-US': enUS,
}
const endOfHour = (date: Date): Date => addHours(startOfHour(date), 1)
const now = new Date()
const start = endOfHour(now)
const end = addHours(start, 2)
// The types here are `object`. Strongly consider making them better as removing `locales` caused a fatal error
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,

})



const DnDCalendar = withDragAndDrop(Calendar)


export const PriceCalendarPepe = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpenModal = () => {
        setIsOpen(true);
    };

    const handleCloseModal = () => {
        setIsOpen(false);
    };

    const handleSubmitModal = (value: string) => {
        console.log('Submitted value:', value);
    };



    const [events, setEvents] = useState<Event[]>([
        {
            title: 'Learn cool stuff',
            start,
            end,
        },
    ])

    const handleSelectSlot = useCallback(
        ({ start, end }) => {
            const title = window.prompt('New Event name')
            if (title) {
                setEvents((prev) => [...prev, { start, end, title }])
                console.log("title:", title)
            }
            //handleOpenModal()

        },
        [setEvents]
    )



    return (
        <Layout>
            <div>
                {/* <button onClick={handleOpenModal}>Open Modal</button> */}
                <Modal
                    isOpen={isOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmitModal}
                />
            </div>
            <DnDCalendar
                defaultView='month'
                events={events}
                localizer={localizer}
                resizable
                style={{ height: '400px' }}
                onSelectSlot={handleSelectSlot}
                selectable={true}

            />
        </Layout>


    )
}




