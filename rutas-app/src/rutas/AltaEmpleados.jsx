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
        <div className="max-w-4xl mx-auto px-6 py-8 bg-white rounded-lg shadow-xl">
  {/* Encabezado */}
  <div className='text-center mb-8'>
    <h1 className='text-3xl font-bold text-gray-800'>ALTA DE EMPLEADOS</h1>
    <div className='w-20 h-1 bg-blue-500 mx-auto mt-2'></div>
  </div>

  {/* Formulario */}
  <div className='space-y-6'>
    {/* Fila de campos */}
    <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
      {/* Columna izquierda */}
      <div className='space-y-4'>
        <div>
          <label className='block text-gray-700 font-medium mb-2'>CIUDAD</label>
          <ComboBox 
            options={cities}
            placeholder="Selecciona una ciudad"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className='block text-gray-700 font-medium mb-2'>NOMBRE</label>
          <BasicTextFields
            placeholder="Ingresa el nombre completo"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className='block text-gray-700 font-medium mb-2'>FECHA DE NACIMIENTO</label>
          <DateInput 
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Columna derecha */}
      <div className='space-y-4'>
        <div>
          <label className='block text-gray-700 font-medium mb-2'>APELLIDO PATERNO</label>
          <BasicTextFields
            placeholder="Ingresa apellido paterno"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className='block text-gray-700 font-medium mb-2'>APELLIDO MATERNO</label>
          <BasicTextFields
            placeholder="Ingresa apellido materno"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div>
          <label className='block text-gray-700 font-medium mb-2'>SUELDO</label>
          <BasicTextFields
            type="number"
            placeholder="Ingresa el sueldo"
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
    </div>

    {/* Botones */}
    <div className='flex flex-col sm:flex-row justify-end gap-4 pt-6 border-t border-gray-200'>
      <Link 
        to='/busqueda-empleados' 
        className='px-6 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 text-center'
      >
        Cancelar
      </Link>
      <button 
        className='px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200'
      >
        Guardar Empleado
      </button>
    </div>
  </div>
</div>
  )
}
