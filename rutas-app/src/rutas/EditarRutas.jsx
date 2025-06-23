import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import tipoServicio from "../components/TipoServicio";

const formSchema = z
  .object({
    cityId: z.number().optional(), // Opcional si no se envía al PUT
    name: z.string().optional(), // Opcional si no se envía al PUT
    type: z.enum(["PERSONAL", "ITEMS", "INTERURBANA"], {
      message: "Tipo de servicio es requerido",
    }),
    driverId: z
      .number({
        message: "Chofer es requerido",
      })
      .gt(0, "Debe seleccionar un chofer válido"),
    capacity: z
      .number({
        message: "Capacidad es requerida",
      })
      .gt(0, "Capacidad debe ser mayor a 0"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "ITEMS") {
      if (data.capacity > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Capacidad para servicio de items no puede ser mayor a 100",
          path: ["capacity"],
        });
      }
    }

    if (data.type === "PERSONAL") {
      if (data.capacity > 34) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Capacidad para servicio personal no puede ser mayor a 34",
          path: ["capacity"],
        });
      }
    }

    if (data.type === "INTERURBANA") {
      if (data.capacity > 50) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Capacidad para servicio interurbano no puede ser mayor a 50",
          path: ["capacity"],
        });
      }
    }
  });

export default function EditarRutas({ routeId, currentCityId, routes, onClose }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [routeData, setRouteData] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityId: null,
      name: "",
      type: null,
      driverId: null,
      capacity: 0,
    },
  });

  const formValues = watch();

  // Cargar ciudades
  useEffect(() => {
    axios.get("/cities").then((response) => {
      setCities(response.data);
    });
  }, []);

  // Cargar datos de la ruta a editar
  useEffect(() => {
    if (routeId && cities.length > 0) {
      // Primero buscar en las rutas actuales (más eficiente)
      let foundRoute = routes?.find(route => route.id === routeId);
      
      if (foundRoute) {
        // Añadir el cityId actual
        foundRoute = { ...foundRoute, cityId: currentCityId };
        setRouteData(foundRoute);
        
        // Precargar los valores del formulario
        setValue("cityId", foundRoute.cityId);
        setValue("name", foundRoute.name);
        setValue("type", foundRoute.type);
        setValue("driverId", foundRoute.driverId || foundRoute.driver?.id);
        setValue("capacity", foundRoute.capacity);
        
        setLoading(false);
      } else {
        // Si no encontramos la ruta, intentar cargar desde el endpoint
        axios
          .get(`/routes/${routeId}`)
          .then((response) => {
            const route = response.data;
            setRouteData(route);
            
            // Precargar los valores del formulario
            setValue("cityId", route.cityId || currentCityId);
            setValue("name", route.name);
            setValue("type", route.type);
            setValue("driverId", route.driverId || route.driver?.id);
            setValue("capacity", route.capacity);
            
            setLoading(false);
          })
          .catch((error) => {
            console.error("Error al cargar la ruta:", error);
            alert("Error al cargar los datos de la ruta. El endpoint /routes/{id} no está disponible.");
            setLoading(false);
            onClose();
          });
      }
    }
  }, [routeId, setValue, cities, routes, currentCityId, onClose]);

  const onSubmit = async (data) => {
    try {
      console.log("Datos a enviar:", data);
      
      // Construir la URL con query parameters
      const params = new URLSearchParams({
        type: data.type,
        capacity: data.capacity.toString(),
        driverId: data.driverId.toString()
      });
      
      // Si tu API también acepta name y cityId como parámetros, descomenta estas líneas:
      // params.append('name', data.name);
      // params.append('cityId', data.cityId.toString());
      
      const url = `/routes/${routeId}?${params.toString()}`;
      console.log("URL final:", url);
      
      await axios.put(url);
      alert("Ruta actualizada exitosamente");
      onClose();
    } catch (error) {
      console.error("Error al actualizar la ruta:", error);
      
      // Mostrar mensaje de error más específico
      if (error.response) {
        const status = error.response.status;
        const message = error.response.data?.message || error.response.data || 'Error desconocido';
        alert(`Error ${status}: ${message}`);
      } else if (error.request) {
        alert("Error de conexión: No se pudo conectar con el servidor");
      } else {
        alert(`Error: ${error.message}`);
      }
    }
  };

  if (loading) {
    return (
      <Card
        sx={{
          maxWidth: "600px",
          margin: "auto",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <div className="text-lg mb-4">Cargando datos de la ruta...</div>
        <div className="text-sm text-gray-600">
          ID de ruta: {routeId}
        </div>
      </Card>
    );
  }

  if (!routeData) {
    return (
      <Card
        sx={{
          maxWidth: "600px",
          margin: "auto",
          padding: 8,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "200px",
        }}
      >
        <div className="text-lg mb-4 text-red-600">
          No se pudieron cargar los datos de la ruta
        </div>
        <Button onClick={onClose} variant="contained">
          Cerrar
        </Button>
      </Card>
    );
  }

  return (
    <Card
      component="form"
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: 8,
        display: "flex",
        flexDirection: "column",
        gap: 4,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        EDITAR RUTA
      </h1>
      
      <Autocomplete
        value={cities.find((c) => c.id === formValues.cityId) ?? null}
        onChange={(_, value) => {
          setValue("cityId", value?.id || null, {
            shouldValidate: true,
          });
          // Limpiar el chofer cuando cambie la ciudad
          setValue("driverId", null);
        }}
        options={cities}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ciudad (solo lectura)"
            variant="outlined"
            error={!!errors.cityId}
            helperText={errors.cityId?.message || "La ciudad no se puede cambiar al editar"}
            disabled={true} // Deshabilitar el campo de ciudad
          />
        )}
      />

      <TextField
        label="Nombre de la ruta (solo lectura)"
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message || "El nombre no se puede cambiar al editar"}
        {...register("name")}
        fullWidth
        disabled={true} // Deshabilitar el campo de nombre
      />

      <Autocomplete
        value={tipoServicio.find((t) => t.id === formValues.type) ?? null}
        options={tipoServicio}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.id}
        onChange={(_, value) => {
          setValue(
            "type",
            value?.id as "PERSONAL" | "ITEMS" | "INTERURBANA" || null,
            {
              shouldValidate: true,
            }
          );
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona un tipo de servicio"
            variant="outlined"
            error={!!errors.type}
            helperText={errors.type?.message}
          />
        )}
      />

      <Autocomplete
        value={
          cities
            .find((c) => c.id === formValues.cityId)
            ?.employees.find(
              (employee) => employee.id === formValues.driverId
            ) ?? null
        }
        options={
          cities.find((c) => c.id === formValues.cityId)?.employees || []
        }
        onChange={(_, value) => {
          setValue("driverId", value?.id || null, {
            shouldValidate: true,
          });
        }}
        getOptionLabel={(option) =>
          [option.firstName, option.lastName, option.middleName]
            .filter(Boolean)
            .join(" ")
        }
        getOptionKey={(option) => option.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona un chofer"
            variant="outlined"
            error={!!errors.driverId}
            helperText={errors.driverId?.message}
          />
        )}
        disabled={false} // Permitir cambiar chofer
      />

      <TextField
        label="Capacidad"
        type="number"
        variant="outlined"
        error={!!errors.capacity}
        helperText={errors.capacity?.message}
        {...register("capacity", {
          valueAsNumber: true,
        })}
        fullWidth
        onKeyDown={(e) => {
          if (["e", "E", "+", "-"].includes(e.key)) {
            e.preventDefault();
          }
        }}
      />

      <Box
        sx={{
          justifyContent: "end",
          display: "flex",
          gap: 2,
        }}
      >
        <Button variant="contained" type="submit">
          Actualizar
        </Button>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Card>
  );
}