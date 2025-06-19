import { useState } from 'react'
import React from 'react'
import ReactDOM from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import './App.css'
import AltaRutas from './rutas/AltaRutas'

import Navegacion from './Servicio/Navegacion'

function App() {

  return (

    <div className='container mx-auto flex flex-col items-center justify-center' style={{marginLeft: '100px', marginRight: '100px'}}>
      <Navegacion />
      <AltaRutas />
    </div>
    

  )
}



export default App
