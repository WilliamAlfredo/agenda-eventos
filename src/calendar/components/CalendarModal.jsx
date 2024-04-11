import { addHours, differenceInSeconds } from 'date-fns';
import React, { useState } from 'react';
import Modal from 'react-modal';
import DatePicker, { registerLocale } from 'react-datepicker'; 
import 'react-datepicker/dist/react-datepicker.css'; 
import { es } from 'date-fns/locale/es';



registerLocale ('es', es);

Modal.setAppElement('#root');

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)',
        width: '70%',
        height: '70%'
    }
};

export const CalendarModal = () => {

    const  [isOpen, setIsOpen] = useState(true);
    const [formValues, setFormValues] = useState({
        title: 'Titulo de evento ',
        notes: 'Descripcion del evento ',
        start: new Date(),
        end: addHours(new Date(), 2),
    });

    const  onInputChanged = ({ target }) => {
        setFormValues({
            ...formValues,
            [target.name]: target.value
        });
    }

    const onDateChanged = (event, changing ) => {
        setFormValues({
            ...formValues,
            [changing]: event
        })
    }

    const onCloseModal = () => {
        setIsOpen(false);

        
    }
    const onSubmit = (event) => {

        event.preventDefault();


        const difference = differenceInSeconds( formValues.end, formValues.start );
        console.log({ difference });

        if ( isNaN(difference) || difference <= 0 ) {
            Swal.fire('Fechas incorrectas', 'Revisas fechas ingresadas', 'error');
            return;
        }

        if ( formValues.title.length <= 0 ) {
            return;
        }

        console.log(formValues);
    }


    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onCloseModal} // Utiliza la función onCloseModal para cerrar el modal
            style={customStyles}
            

            className="modal"
            overlayClassName="modal-fondo"
            closeTimeoutMS={200}
        >
           <h1>New Note</h1>
           <hr />
           <form className='container'  onSubmit={onSubmit}>
            <div className='form-group mb-2'>
                <label>Fecha y hora de inicio</label>
                <DatePicker
                    selected = { formValues.start } 
                    className='form-cntrol'
                    onChange={(event) => onDateChanged(event,'start')}
                    dateFormat='Pp'
                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
                
            </div>

            <div className='form-group mb-2'>
                <label>Fecha y hora de fin</label>
                <DatePicker
                    minDate = {formValues.start} 
                    selected={formValues.end}
                    className='form-cntrol'
                    onChange={(event) => onDateChanged(event,'end')}
                    dateFormat='Pp'

                    showTimeSelect
                    locale='es'
                    timeCaption='Hora'
                />
                
            </div>
            <hr />
            <div className='form-group mb-2'>
                <label>Titulo y nota </label>
                <input type="text"  
                className={'form-control ${titleClass}'}
                placeholder='Titulo del evento'
                autoComplete='off'

                value={formValues.title}
                onChange = {onInputChanged}
                
                />
                <small id="emailHelp" className="form-text text-muted">Una descripción corta</small>
            </div>

            <div>
                <textarea
                    type="text"
                    className="form-control"
                    placeholder="Notas"
                    rows="5"
                    name='notes'

                    value={formValues.notes}
                    onChange = {onInputChanged}
                ></textarea>
                <small id="emailHelp" className="form-text text-muted">Información adicional</small>
            </div>

            <button type='submit' className='btn btn-outline-primary btn block'>
                <i className= 'fa fa-save'></i>
                &nbsp;
                <span>Guardar</span>
                </button>

           </form>
       
          

        </Modal>
    );
};
