import React from 'react'
import ComboBox from '../components/combobox';
import BasicTextFields from '../components/BasicTextField';
import cities from '../components/Cities';
import tipoServicio from '../components/TipoServicio';
import chofer from '../components/Chofer';


export default function BusquedaRutas() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
    {/* Encabezado */}
        <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">BUSQUEDA DE RUTAS</h1>
            <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
        </div>

        {/* Contenedor principal */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
            {/* Barra de búsqueda */}
            <div className="flex flex-col md:flex-row gap-4 mb-8 items-end">
            <div className="flex-1 w-full">
                <label className="block text-gray-700 font-medium mb-2">CIUDAD</label>
                <div className="flex gap-4">
                <ComboBox 
                    options={cities}
                    label="Selecciona una ciudad"
                    className="flex-1"
                />
                <button className="bg-orange-500 hover:bg-orange-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200 shadow-md whitespace-nowrap">
                    Buscar Rutas
                </button>
                </div>
            </div>
            </div>

            {/* Sección de resultados */}
            <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-gray-800">RUTAS POR CIUDAD</h2>
            <a 
                href="/" 
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-lg transition duration-200 flex items-center gap-2"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                Agregar Ruta
            </a>
            </div>

            {/* Tabla de resultados */}
            <div className="relative overflow-x-auto rounded-lg border border-gray-200 shadow-sm">
            <table className="w-full text-sm text-left text-gray-700">
                <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                <tr>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    ID Ruta
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Nombre Ruta
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Tipo
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Capacidad
                    </th>
                    <th scope="col" className="px-6 py-3 whitespace-nowrap">
                    Acciones
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    1
                    </td>
                    <td className="px-6 py-4">
                    Ruta Culiacan 2
                    </td>
                    <td className="px-6 py-4">
                    Articulo
                    </td>
                    <td className="px-6 py-4">
                    15
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition duration-200">
                        Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition duration-200">
                        Eliminar
                    </button>
                    </td>
                </tr>
                {/* Ejemplo de fila adicional */}
                <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    2
                    </td>
                    <td className="px-6 py-4">
                    Ruta Mazatlán
                    </td>
                    <td className="px-6 py-4">
                    Pasajeros
                    </td>
                    <td className="px-6 py-4">
                    24
                    </td>
                    <td className="px-6 py-4 flex gap-2">
                    <button className="text-blue-600 hover:text-blue-800 font-medium px-3 py-1 rounded-md hover:bg-blue-50 transition duration-200">
                        Editar
                    </button>
                    <button className="text-red-600 hover:text-red-800 font-medium px-3 py-1 rounded-md hover:bg-red-50 transition duration-200">
                        Eliminar
                    </button>
                    </td>
                </tr>
                </tbody>
            </table>
            </div>

            {/* Paginación (opcional) */}
            <div className="flex justify-between items-center mt-6">
            <div className="text-sm text-gray-600">
                Mostrando 1 al 2 de 2 resultados
            </div>
            <div className="flex gap-2">
                <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100">
                Anterior
                </button>
                <button className="px-3 py-1 border rounded-md bg-blue-600 text-white">
                1
                </button>
                <button className="px-3 py-1 border rounded-md text-gray-700 hover:bg-gray-100">
                Siguiente
                </button>
            </div>
            </div>
        </div>
    </div>
  )
}
