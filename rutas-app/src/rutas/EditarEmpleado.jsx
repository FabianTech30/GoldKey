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
      // Validación de campos requeridos
      if (!formData.firstName || !formData.lastName || !formData.birthDate || !formData.salary) {
        throw new Error("Todos los campos marcados con * son obligatorios");
      }

      // Convertir el salario a número
      const salaryNumber = parseFloat(formData.salary);
      if (isNaN(salaryNumber)) {
        throw new Error("El sueldo debe ser un número válido");
      }

      // Preparar TODOS los parámetros para la URL
      const params = new URLSearchParams();
      params.append('firstName', formData.firstName.trim());
      params.append('lastName', formData.lastName.trim());
      params.append('motherLastName', formData.motherLastName.trim());
      params.append('birthDate', formData.birthDate.format("YYYY-MM-DD"));
      params.append('salary', salaryNumber.toString());
      params.append('active', formData.active);

      // Enviar la solicitud PUT con TODOS los parámetros en la URL
      const response = await axios.put(`/employees/${employee.id}?${params.toString()}`);

      if (response.status === 200) {
        alert("¡Empleado actualizado correctamente!");
        onClose(); // Cerrar el modal y refrescar la lista
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
    <div className="bg-white rounded-lg p-6 mx-auto my-8 max-w-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Editar Empleado</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <TextField
          label="Nombre *"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          fullWidth
          required
          disabled={loading}
        />
        <TextField
          label="Apellido Paterno"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          fullWidth
          required
          disabled={loading}
        />
        <TextField
          label="Apellido Materno"
          name="motherLastName"
          value={formData.motherLastName}
          onChange={handleChange}
          fullWidth
          disabled={loading}
        />
        <DatePicker
          label="Fecha de Nacimiento"
          value={formData.birthDate}
          onChange={handleDateChange}
          disabled={loading}
          slotProps={{
            textField: {
              fullWidth: true,
              required: true,
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
          inputProps={{ 
            step: "0.01",
            min: "0"
          }}
        />
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
          label={formData.active ? "Activo" : "Inactivo"}
        />
        <div className="flex justify-end space-x-2">
          <Button 
            variant="outlined" 
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button 
            variant="contained" 
            type="submit" 
            color="primary"
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar Cambios"}
          </Button>
        </div>
      </form>
    </div>
  );
}