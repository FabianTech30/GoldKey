import React from 'react'
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import ComboBox from '../components/combobox';
import BasicTextFields from '../components/BasicTextField';
import cities from '../components/Cities';
import tipoServicio from '../components/TipoServicio';
import chofer from '../components/Chofer';



export default function AltaRutas() {
  return (
    <div className='container' style={{marginLeft: '100px', marginRight: '100px'}}>
        <div className='container text-center text-4xl bg-gray-500 text-white' style={{marginTop: '10px'}}>
            <h1>Alta de Rutas</h1>
        </div>
        <div className=' container text-justify text-1xl p-2 border-4 border-gray-500' style={{marginTop: '20px'}} >
            <h3 className='p-2'>RUTAS</h3>
            <ComboBox 
            options={cities}
            label="SELECCIONA UNA RUTA"
            />
            <h3 className='p-2'>NOMBRE</h3>
            <BasicTextFields
            label="INGRESA EL NOMBRE DE LA RUTA"
            />

            <h3 className='p-2'>Servicio</h3>
            <ComboBox 
            options={tipoServicio}
            label="SELECCIONA UN TIPO DE SERVICIO"
            />

            <h3 className='p-2'>Chofer</h3>
            <ComboBox 
            options={chofer}
            label="SELECCIONA UN CHOFER"
            />

            <h3 className='p-2'>CAPACIDAD</h3>
            <BasicTextFields
            label="INGRESA LA CAPACIDAD DEL VEHICULO"
            />
        </div>
    </div>

  )
}

