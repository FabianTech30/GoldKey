import { Button, TextField, FormControlLabel, Switch } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import axios from "axios";
import { useState } from "react";

export default function EditarEmpleados({ employee, onClose }) {
  const [formData, setFormData] = useState({
    firstName: employee?.firstName || "",
    lastName: employee?.lastName || "",
    motherLastName: employee?.motherLastName || "",
    birthDate: employee?.birthDate ? dayjs(employee.birthDate) : null,
    salary: employee?.salary || "",
    active: employee?.active || false,
  });
 
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleDateChange = (date) => {
    setFormData({
      ...formData,
      birthDate: date,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.salary) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      const salaryNumber = parseFloat(formData.salary);
      if (isNaN(salaryNumber)) {
        throw new Error("El sueldo debe ser un número válido");
      }

      const params = new URLSearchParams();
      params.append('firstName', formData.firstName.trim());
      params.append('lastName', formData.lastName.trim());
      params.append('motherLastName', formData.motherLastName.trim());
      params.append('birthDate', formData.birthDate.format("YYYY-MM-DD"));
      params.append('salary', salaryNumber.toString());
      params.append('active', formData.active);

      const response = await axios.put(`/employees/${employee.id}?${params.toString()}`);

      if (response.status === 200) {
        alert("¡Empleado actualizado correctamente!");
        onClose();
      }
    } catch (error) {
      console.error("Error completo:", error);
      setError(error.response?.data?.message || 
              error.message || 
              "Error al actualizar el empleado. Verifica los datos e intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl p-8 mx-auto my-8 max-w-md border border-gray-100">
      <div className="mb-6">
        <h2 className="text-3xl font-bold text-gray-800 text-center">Editar Empleado</h2>
        <div className="w-20 h-1 bg-blue-500 mx-auto mt-2 rounded-full"></div>
      </div>
      
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-lg border border-red-100 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-4">
          <TextField
            label="Nombre *"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            variant="outlined"
            size="small"
            className="bg-gray-50"
          />
          <TextField
            label="Apellido Paterno *"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            variant="outlined"
            size="small"
            className="bg-gray-50"
          />
          <TextField
            label="Apellido Materno"
            name="motherLastName"
            value={formData.motherLastName}
            onChange={handleChange}
            fullWidth
            disabled={loading}
            variant="outlined"
            size="small"
            className="bg-gray-50"
          />
          <DatePicker
            label="Fecha de Nacimiento *"
            value={formData.birthDate}
            onChange={handleDateChange}
            disabled={loading}
            slotProps={{
              textField: {
                fullWidth: true,
                required: true,
                variant: "outlined",
                size: "small",
                className: "bg-gray-50 w-full",
              }
            }}
          />
          <TextField
            label="Sueldo *"
            name="salary"
            type="number"
            value={formData.salary}
            onChange={handleChange}
            fullWidth
            required
            disabled={loading}
            variant="outlined"
            size="small"
            className="bg-gray-50"
            inputProps={{ 
              step: "0.01",
              min: "0"
            }}
          />
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg border border-gray-200">
            <span className="text-sm font-medium text-gray-700">Estado del empleado</span>
            <FormControlLabel
              control={
                <Switch
                  name="active"
                  checked={formData.active}
                  onChange={handleChange}
                  color="primary"
                  disabled={loading}
                />
              }
              label={formData.active ? (
                <span className="text-green-600 font-medium">Activo</span>
              ) : (
                <span className="text-gray-500 font-medium">Inactivo</span>
              )}
              labelPlacement="start"
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-4">
          <Button 
            variant="outlined" 
            onClick={onClose}
            disabled={loading}
            className="px-6 py-2 border-gray-300 text-gray-600 hover:bg-gray-50"
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            type="submit" 
            color="primary"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white shadow-sm"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Guardando...
              </span>
            ) : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}