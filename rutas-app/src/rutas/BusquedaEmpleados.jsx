import { Autocomplete, Button, Modal, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import AltaEmpleados from "./AltaEmpleados";
import dayjs from "dayjs";

export default function BusquedaEmpleados() {
  const [isAddEmployeeOpen, setIsAddEmployeeOpen] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [cities, setCities] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [sortModel, setSortModel] = useState([
    {
      field: "id",
      sort: "asc",
    },
  ]);

  // Cargar las ciudades al iniciar
  useEffect(() => {
    axios.get("/cities").then((response) => {
      setCities(response.data);
    });
  }, []);

  // Cargar empleados cuando se selecciona una ciudad
  useEffect(() => {
    if (cityId) {
      axios.get(`/cities/${cityId}/employees`).then((response) => {
        setEmployees(response.data);
      });
    } else {
      setEmployees([]);
    }
  }, [cityId]);

  // Formatear el sueldo como moneda
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-MX", {
      style: "currency",
      currency: "MXN",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800">
          BÚSQUEDA DE EMPLEADOS
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto mt-2"></div>
      </div>
      <div className="bg-white rounded-xl shadow-md overflow-hidden p-6">
        <Autocomplete
          value={cities.find((c) => c.id === cityId) ?? null}
          onChange={(_, value) => {
            setCityId(value?.id || null);
          }}
          options={cities}
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option.id}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ciudad"
              variant="outlined"
              fullWidth
              error={!cityId}
              helperText={!cityId ? "Por favor, selecciona una ciudad." : ""}
            />
          )}
        />
        <div className="mb-6 mt-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            EMPLEADOS POR CIUDAD
          </h2>
          <Button
            variant="contained"
            onClick={() => setIsAddEmployeeOpen(true)}
          >
            Agregar Empleado
          </Button>
        </div>
        <DataGrid
          rowSelection={false}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          columns={[
            {
              field: "id",
              headerName: "ID",
              width: 100,
              sortable: true,
            },
            {
              field: "firstName",
              headerName: "Nombre",
              width: 150,
              sortable: true,
            },
            {
              field: "lastName",
              headerName: "AP. Paterno",
              width: 150,
              sortable: true,
            },
            {
              field: "motherLastName",
              headerName: "AP. Materno",
              width: 150,
              sortable: true,
            },
            {
              field: "birthDate",
              headerName: "Fecha Nacimiento",
              width: 170,
              sortable: true,
              valueFormatter: (params) =>
                dayjs(params.value).format("DD/MM/YYYY"),
            },
            {
              field: "salary",
              headerName: "Sueldo",
              width: 150,
              sortable: true,
              renderCell: (params) => (
                <span className="font-medium">
                  {formatCurrency(params.value)}
                </span>
              ),
            },
            {
              field: "status",
              headerName: "Estado",
              width: 120,
              sortable: true,
              renderCell: (params) => (
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium ${
                    params.row.active
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {params.row.active ? "Activo" : "Inactivo"}
                </span>
              ),
            },
            {
              field: "actions",
              headerName: "Acciones",
              width: 170,
              renderCell: (params) => (
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => handleEdit(params.row.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              ),
            },
          ]}
          rows={employees.map((employee) => ({
            id: employee.id,
            firstName: employee.firstName,
            lastName: employee.lastName,
            motherLastName: employee.motherLastName,
            birthDate: employee.birthDate,
            salary: employee.salary,
            active: employee.active,
          }))}
          autoHeight
          disableColumnMenu
          pagination
          pageSize={10}
          rowsPerPageOptions={[10, 25, 50]}
          className="border-none shadow-none"
        />
      </div>
      <Modal
        className="overflow-y-scroll"
        open={isAddEmployeeOpen}
        onClose={() => setIsAddEmployeeOpen(false)}
      >
        <AltaEmpleados
          onClose={() => {
            setIsAddEmployeeOpen(false);
            if (cityId) {
              axios.get(`/cities/${cityId}/employees`).then((response) => {
                setEmployees(response.data);
              });
            }
          }}
        />
      </Modal>
    </div>
  );
}

function handleEdit(id) {
  console.log(`Editar empleado con id: ${id}`);
}

function handleDelete(id) {
  if (confirm("¿Estás seguro de que deseas eliminar este empleado?")) {
    axios
      .delete(`/employees/${id}`)
      .then(() => {
        alert("Empleado eliminado exitosamente");
      })
      .catch(() => {
        alert("Error al eliminar empleado, ya tiene rutas asignadas");
      });
  }
}
