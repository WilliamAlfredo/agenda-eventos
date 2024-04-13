import { useDispatch, useSelector } from 'react-redux'; // importar useDispatch
import { onSetActiveEvent } from '../store'; // importar onSetActiveEvent

export const useCalendarStore = () => {

    // creamos la constante
    const dispatch = useDispatch();

    const { events, activeEvent } = useSelector( state => state.calendar );

    

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent) );
    }// este es mi primer método que voy a exponer

    return {
        //* propiedades
        events,
        activeEvent,

        //* métodos
        setActiveEvent
    }
}


