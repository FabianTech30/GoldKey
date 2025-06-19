import React from 'react'
import ComboBox from '../components/combobox';
import BasicTextFields from '../components/BasicTextField';
import cities from '../components/Cities';
import tipoServicio from '../components/TipoServicio';
import chofer from '../components/Chofer';

export default function BusquedaEmpleados() {
  return (
    <div className='container' style={{marginLeft: '100px', marginRight: '100px'}}>
        <div className='container text-center text-4xl text-black' style={{marginTop: '10px'}}>
            <h1 className='font-bold'>BUSQUEDA DE EMPLEADOS</h1>
        </div>
        <div className='container dark:bg-gray-800text-justify text-1xl' style={{marginTop: '20px'}} >
            <h3 className='p-2'>CIUDAD</h3>
            <ComboBox 
            options={cities}
            label=""
            />
            <a href="/busqueda" className='bg-orange-200 hover:bg-blue-700 text-black font-bold ' style={{marginTop: '20px'}}>
                    Buscar
              </a>
            <div className='flex justify-between items-center' style={{marginTop: '20px'}}>
              <h3 className='text-3xl'>RUTAS POR CIUDAD</h3>
              <a href="/alta-empleados" className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded' style={{marginTop: '20px'}}>
                    Nuevo Empleado
              </a>
            </div>
            
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg" style={{marginTop: '20px'}}>
            <table class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" class="px-6 py-3">
                            ID Empleado
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Nombre
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ap. paterno
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Ap. materno
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Fecha de nacimiento
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Sueldo
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Modificar
                        </th>
                        <th scope="col" class="px-6 py-3">
                            Eliminar
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700 border-gray-200">
                        <th scope="row" class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            1
                        </th>
                        <td class="px-6 py-4">
                            Ruta Culiacan 2
                        </td>
                        <td class="px-6 py-4">
                            Articulo
                        </td>
                        <td class="px-6 py-4">
                            15
                        </td>
                        <td class="px-6 py-4">
                            30-07-2002
                        </td>
                        <td class="px-6 py-4">
                            $20000
                        </td>
                        <td class="px-6 py-4">
                            <button className='hover:bg-blue-700 text-white font-bold' style={{marginTop: '20px'}}>
                              Editar
                            </button>
                        </td>
                        <td class="px-6 py-4">
                            <button className=' hover:bg-red-700 text-white font-bold' style={{marginTop: '20px', marginLeft: '10px'}}>
                              Eliminar
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        </div>
    </div>
  )
}
