import ComboBox from "../components/combobox";
import BasicTextFields from "../components/BasicTextField";
import cities from "../components/Cities";
import tipoServicio from "../components/TipoServicio";
import chofer from "../components/Chofer";

export default function AltaRutas() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">ALTA DE RUTAS</h1>
        <div className="w-20 h-1 bg-blue-500 mx-auto"></div>
      </div>
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">RUTA:</label>
          <ComboBox
            options={cities}
            label="Selecciona una ruta"
            className="w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            NOMBRE:
          </label>
          <BasicTextFields
            label="Ingresa el nombre de la ruta"
            className="w-full"
            variant="outlined"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            SERVICIO:
          </label>
          <ComboBox
            options={tipoServicio}
            label="Selecciona un tipo de servicio"
            className="w-full"
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 font-medium mb-2">
            CHOFER:
          </label>
          <ComboBox
            options={chofer}
            label="Selecciona un chofer"
            className="w-full"
          />
        </div>
        <div className="mb-8">
          <label className="block text-gray-700 font-medium mb-2">
            CAPACIDAD:
          </label>
          <BasicTextFields
            label="Ingresa la capacidad del vehículo"
            className="w-full"
            variant="outlined"
            type="number"
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition duration-200">
            Cancelar
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 shadow-md">
            Guardar Ruta
          </button>
        </div>
      </div>
    </div>
  );
}
