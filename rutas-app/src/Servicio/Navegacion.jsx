import React from 'react'
import { Link } from 'react-router-dom'

export default function Navegacion() {
  return (
        <div className="w-full">
        <nav className="bg-gradient-to-r from-indigo-600 to-blue-800 shadow-lg">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <span className="self-center text-2xl font-bold whitespace-nowrap text-white hover:text-blue-200 transition-colors duration-300">
            Comex
          </span>
        </Link>
        
        <button 
          data-collapse-toggle="navbar-default" 
          type="button" 
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-colors duration-200" 
          aria-controls="navbar-default" 
          aria-expanded="false"
        >
          <svg className="w-5 h-5" aria-hidden="true">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
          </svg>
        </button>
        
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 rounded-lg bg-blue-700 md:bg-transparent md:flex-row md:space-x-6 rtl:space-x-reverse md:mt-0">
            <li>
              <Link 
                to="/" 
                className="block py-2 px-3 text-white rounded md:rounded-none md:hover:bg-transparent md:border-0 md:hover:text-blue-200 md:p-0 transition-colors duration-200 hover:bg-blue-600 md:hover:scale-105"
              >
                Alta de Rutas
              </Link>
            </li>
            <li>
              <Link 
                to="/busqueda" 
                className="block py-2 px-3 text-white rounded md:rounded-none md:hover:bg-transparent md:border-0 md:hover:text-blue-200 md:p-0 transition-colors duration-200 hover:bg-blue-600 md:hover:scale-105"
              >
                Búsqueda Rutas
              </Link>
            </li>
            <li>
              <Link 
                to="/alta-empleados" 
                className="block py-2 px-3 text-white rounded md:rounded-none md:hover:bg-transparent md:border-0 md:hover:text-blue-200 md:p-0 transition-colors duration-200 hover:bg-blue-600 md:hover:scale-105"
              >
                Alta Empleados
              </Link>
            </li>
            <li>
              <Link 
                to="/busqueda-empleados" 
                className="block py-2 px-3 text-white rounded md:rounded-none md:hover:bg-transparent md:border-0 md:hover:text-blue-200 md:p-0 transition-colors duration-200 hover:bg-blue-600 md:hover:scale-105"
              >
                Búsqueda Empleados
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </div>
  )
}
