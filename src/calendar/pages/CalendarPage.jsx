import React, { useState } from 'react'; // Importa useState desde React
import { Calendar } from 'react-big-calendar';
import { addHours } from 'date-fns';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from "../";
import { localizer, getMessagesES } from '../../helpers';
import { CalendarModal } from '../components/CalendarModal';


const events = [{
    title: 'Cumpleaño',
    notes:'comprar un regalo para esa fecha especial ',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor : '#fafafa',
    user:{
        _id:'123',
        name: 'Andres'
    }
}];

export const CalendarPage = () => {
    const [lastView, setLastView] = useState(localStorage.getItem('lastView') || 'agenda');

    const eventStyleGetter = (event, start, end, isSelected) => {
        const style = {
            backgroundColor: 'green',
            borderRadius: '0px',
            opacity: 0.8,
            display: 'block',
            color: 'white'
        };
        return {
            style
        };
    };

    const onDoubleClick = (event) => {
        console.log('onDoubleClick', event);
    };

    const onSelect = (event) => {
        console.log('click', event);
    };

    const onViewChange = (view) => {
        localStorage.setItem('lastView', view);
    };

    return(
        <>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                messages={getMessagesES()}
                eventPropGetter={eventStyleGetter}
                components={{
                    event: ({ event }) => {
                        return (
                            <div>
                                <strong>{event.title}</strong>
                                <br />
                                <span>{event.user.name}</span>
                            </div>
                        );
                    }
                }}
                onDoubleClickEvent={onDoubleClick}
                onSelectEvent={onSelect}
                onView={onViewChange}
                defaultView={lastView}
            />
            <CalendarModal />
            
        </>
    );
};
