import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import AltaRutas from "./rutas/AltaRutas";
import BusquedaRutas from "./rutas/BusquedaRutas";
import Navegacion from "./Servicio/Navegacion";
import AltaEmpleados from "./rutas/AltaEmpleados";
import BusquedaEmpleados from "./rutas/BusquedaEmpleados";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="container mx-auto flex flex-col items-center justify-center ">
        <BrowserRouter>
          <Navegacion />
          <Routes>
            <Route path="/" element={<h1>Bienvenido a Cormex</h1>} />
            <Route path="/busqueda" element={<BusquedaRutas />} />
            <Route path="/busqueda-empleados" element={<BusquedaEmpleados />} />
          </Routes>
        </BrowserRouter>
      </div>
    </LocalizationProvider>
  );
}

export default App;
