import { Calendar } from 'react-big-calendar';
import { addHours, } from 'date-fns';//se pueden importr todos los demas
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Navbar } from "../";
import { localizer } from '../../helpers';

const events = [{
    title: 'cumpleaños',
    notes:'comprar regalo',
    start: new Date(),
    end: addHours(new Date(), 2),
    bgColor : '#fafafa',
    user:{
        _id:'123',
        name: 'william'
    }
}]
export const CalendarPage = () => {
    return(
        <>
            <Navbar />
            <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 'calc(100vh - 80px)' }}
                />
        </>
    )
}