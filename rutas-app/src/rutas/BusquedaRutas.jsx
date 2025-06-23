import { Autocomplete, Modal, TextField } from "@mui/material";
import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";
import AltaRutas from "./AltaRutas";
import EditarRutas from "./EditarRutas";

export default function BusquedaRutas() {
  const [isAddRouteOpen, setIsAddRouteOpen] = useState(false);
  const [isEditRouteOpen, setIsEditRouteOpen] = useState(false);
  const [cityId, setCityId] = useState(null);
  const [cities, setCities] = useState([]);
  const [routes, setRoutes] = useState([]);
  const [currentRoute, setCurrentRoute] = useState(null);
  const [sortModel, setSortModel] = useState([
    {
      field: "id",
      sort: "asc",
    },
    {
      field: "name",
      sort: "asc",
    },
    {
      field: "type",
      sort: "asc",
    },
    {
      field: "capacity",
      sort: "asc",
    },
  ]);

  const getRoutes = (cityId) => {
    if (!cityId) {
      setRoutes([]);
      return;
    }

    axios.get(`/cities/${cityId}/routes`).then((response) => {
      setRoutes(response.data);
    });
  };

  useEffect(() => {
    getRoutes(cityId);
  }, [cityId]);

  useEffect(() => {
    axios.get("/cities").then((response) => {
      setCities(response.data);
    });
  }, []);

  const handleEdit = (id) => {
    setCurrentRoute(routes.find((route) => route.id === id));
    setIsEditRouteOpen(true);
  };

  const handleDelete = (id) => {
    if (confirm("¿Estás seguro de que deseas eliminar esta ruta?")) {
      axios
        .delete(`/routes/${id}`)
        .then(() => {
          alert("Ruta eliminada exitosamente");
          getRoutes(cityId);
        })
        .catch(() => {
          alert("Error al eliminar ruta, ya tiene empleados asignados");
        });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          BUSQUEDA DE RUTAS
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto rounded-full"></div>
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
        <div className="mb-6 flex justify-between items-center">
          <h2 className="text-2xl font-semibold text-gray-800">
            RUTAS POR CIUDAD
          </h2>
          <Button variant="contained" onClick={() => setIsAddRouteOpen(true)}>
            Agregar Ruta
          </Button>
        </div>
        <DataGrid
          rowSelection={false}
          sortModel={sortModel}
          onSortModelChange={(model) => setSortModel(model)}
          columns={[
            {
              field: "id",
              headerName: "ID Ruta",
              width: 150,
              sortable: true,
            },
            {
              field: "name",
              headerName: "Nombre Ruta",
              flex: 1,
              sortable: true,
            },
            {
              field: "type",
              headerName: "Tipo",
              width: 150,
              sortable: true,
            },
            {
              field: "capacity",
              headerName: "Capacidad",
              width: 150,
              sortable: true,
            },
            {
              field: "actions",
              headerName: "Acciones",
              width: 200,
              renderCell: (params) => (
                <div className="flex gap-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => handleEdit(params.row.id)}
                  >
                    Editar
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => handleDelete(params.row.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              ),
            },
          ]}
          rows={routes.map((route) => ({
            id: route.id,
            name: route.name,
            type: route.type,
            capacity: route.capacity,
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
        open={isAddRouteOpen}
        onClose={() => setIsAddRouteOpen(false)}
      >
        <AltaRutas
          onClose={() => {
            setIsAddRouteOpen(false);
            getRoutes(cityId);
          }}
        />
      </Modal>
      <Modal open={isEditRouteOpen} onClose={() => setIsEditRouteOpen(false)}>
        <EditarRutas
          route={currentRoute}
          onClose={() => {
            setIsEditRouteOpen(false);
            if (cityId) {
              getRoutes(cityId);
            }
          }}
        />
      </Modal>
    </div>
  );
}
