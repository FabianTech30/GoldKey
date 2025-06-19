import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import AltaRutas from './rutas/AltaRutas'
import BusquedaRutas from './rutas/BusquedaRutas'
import Navegacion from './Servicio/Navegacion'
import AltaEmpleados from './rutas/AltaEmpleados'
import BusquedaEmpleados from './rutas/BusquedaEmpleados'

function App() {

  return (
    <div className="container mx-auto flex flex-col items-center">
      <BrowserRouter>
        <Navegacion />
        <Routes>
          <Route path="/" element={<AltaRutas />} />
          <Route path="/busqueda" element={<BusquedaRutas />} />
          <Route path="/alta-empleados" element={<AltaEmpleados />} />
          <Route path="/busqueda-empleados" element={<BusquedaEmpleados />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}



export default App
