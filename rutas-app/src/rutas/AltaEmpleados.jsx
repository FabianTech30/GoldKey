import React from 'react'
import ComboBox from '../components/combobox';
import BasicTextFields from '../components/BasicTextField';
import cities from '../components/Cities';
import tipoServicio from '../components/TipoServicio';
import chofer from '../components/Chofer';
import DateInput from '../components/DateInput';

export default function AltaEmpleados() {
  return (
        <div className='container' style={{marginLeft: '100px', marginRight: '100px'}}>
        <div className='container text-center text-4xl bg-gray-500 text-white' style={{marginTop: '10px'}}>
            <h1>Alta de Empleados</h1>
        </div>
        <div className=' container text-justify text-1xl p-2 border-4 border-gray-500' style={{marginTop: '20px'}} >
            <h3 className='p-2'>CIUDAD:</h3>
            <ComboBox 
            options={cities}
            label="SELECCIONA UNA RUTA"
            />
            <h3 className='p-2'>NOMBRE:</h3>
            <BasicTextFields
            label="INGRESA EL NOMBRE DE LA RUTA"
            />
            <h3 className='p-2'>AP. PATERNO:</h3>
            <BasicTextFields
            label="INGRESA EL NOMBRE DE LA RUTA"
            />
            <h3 className='p-2'>AP. MATERNO:</h3>
            <BasicTextFields
            label="INGRESA EL NOMBRE DE LA RUTA"
            />
            <h3 className='p-2'>FECHA DE NACIMIENTO:</h3>
            <DateInput />

            <h3 className='p-2'>SUELDO:</h3>
            <BasicTextFields
            label="INGRESA LA CAPACIDAD DEL VEHICULO"
            />

            <div>
                <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' style={{marginTop: '20px'}}>
                    Guardar
                </button>
                <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' style={{marginTop: '20px', marginLeft: '10px'}}>
                    Cancelar
                </button>
            </div>
        </div>
    </div>
  )
}
