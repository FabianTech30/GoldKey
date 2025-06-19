import React from 'react'
import ComboBox from '../components/combobox';
import BasicTextFields from '../components/BasicTextField';
import cities from '../components/Cities';
import tipoServicio from '../components/TipoServicio';
import chofer from '../components/Chofer';
import DateInput from '../components/DateInput';
import { Link } from '@mui/material';

export default function AltaEmpleados() {
  return (
        <div className='container' style={{marginLeft: '100px', marginRight: '100px'}}>
        <div className='container text-center text-4xl text-black' style={{marginTop: '10px'}}>
            <h1 className='font-bold'>ALTA DE EMPLEADOS</h1>
        </div>
        <div className=' container text-justify text-1xl p-2' style={{marginTop: '20px'}} >
            <h3 className='p-2'>CIUDAD:</h3>
            <ComboBox 
            options={cities}
            label="SELECCIONA UNA CIUDAD"
            />
            <h3 className='p-2'>NOMBRE:</h3>
            <BasicTextFields
            label="INGRESA EL NOMBRE DEL EMPLEADO"
            />
            <h3 className='p-2'>AP. PATERNO:</h3>
            <BasicTextFields
            label="INGRESA AP. PATERNO DEL EMPLEADO"
            />
            <h3 className='p-2'>AP. MATERNO:</h3>
            <BasicTextFields
            label="INGRESA AP. MATERNO DEL EMPLEADO"
            />
            <h3 className='p-2'>FECHA DE NACIMIENTO:</h3>
            <DateInput />

            <h3 className='p-2'>SUELDO:</h3>
            <BasicTextFields
            label="INGRESA EL SUELDO DEL EMPLEADO"
            type="number"
            />

            <div className='flex justify-between items-center' style={{marginTop: '20px'}}>
                <a className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' style={{marginTop: '20px'}}>
                    Guardar
                </a>
                <a href='/busqueda-empleados' className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded' style={{marginTop: '20px', marginLeft: '10px'}}>
                    Cancelar
                </a>
            </div>
        </div>
    </div>
  )
}
