import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, Card, TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import tipoServicio from "../components/TipoServicio";
 
const formSchema = z
  .object({
    cityId: z.number({
      message: "Ciudad es requerida",
    }),
    name: z
      .string()
      .min(1, "Nombre es requerido")
      .regex(/^[a-zA-ZñÑ\s]+$/, "Nombre solo puede contener letras y espacios"),
    type: z.enum(["PERSONAL", "ITEMS"], {
      message: "Tipo de servicio es requerido",
    }),
    driverId: z.number({
      message: "Chofer es requerido",
    }),
    capacity: z
      .number({
        message: "Capacidad es requerida",
      })
      .gt(0, "Capacidad debe ser mayor a 0"),
  })
  .superRefine((data, ctx) => {
    if (data.type === "ITEMS" && data.capacity > 100) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message:
          "Capacidad para servicio de artículos no puede ser mayor a 100",
        path: ["capacity"],
      });
    }

    if (data.type === "PERSONAL" && data.capacity > 34) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Capacidad para servicio personal no puede ser mayor a 34",
        path: ["capacity"],
      });
    }
  });

export default function EditarRutas({ route, onClose }) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

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
      cityId: route?.cityId || null,
      name: route?.name || "",
      type: route?.type || null,
      driverId: route?.driverId || null,
      capacity: route?.capacity || 0,
    },
  });

  const formValues = watch();

  useEffect(() => {
    const loadData = async () => {
      try {
        if (!route || !route.id) {
          setError("No se ha proporcionado una ruta válida para editar");
          return;
        }

        const citiesResponse = await axios.get("/cities");
        setCities(citiesResponse.data);
      } catch (error) {
        console.error("Error loading data:", error);
        setError("Error al cargar los datos necesarios");
      }
    };

    loadData();
  }, [route, reset]);

  const onSubmit = async (data) => {
    if (!route?.id) {
      setError("No se ha seleccionado una ruta válida para editar");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await axios.put(`/routes/${route.id}`, null, {
        params: {
          type: data.type,
          capacity: data.capacity,
          driverId: data.driverId,
          name: data.name.trim(),
          cityId: data.cityId,
        },
      });
      onClose(true);
    } catch (error) {
      console.error("Error updating route:", error);
      setError(
        error.response?.data?.message ||
          "Error al actualizar la ruta. Por favor intente nuevamente."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      component="form"
      sx={{
        maxWidth: "600px",
        margin: "auto",
        padding: 4,
        display: "flex",
        flexDirection: "column",
        gap: 3,
      }}
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="text-2xl font-bold text-gray-800 text-center">
        EDITAR RUTA
      </h1>
      {error && (
        <div className="text-red-500 text-center mb-3 p-2 bg-red-50 rounded">
          {error}
        </div>
      )}
      <Autocomplete
        value={cities.find((c) => c.id === formValues.cityId) || null}
        onChange={(_, value) => {
          setValue("cityId", value?.id || null, { shouldValidate: true });
          setValue("driverId", null);
        }}
        options={cities}
        getOptionLabel={(option) => option.name || ""}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Ciudad *"
            variant="outlined"
            error={!!errors.cityId}
            helperText={errors.cityId?.message}
            disabled={loading}
          />
        )}
        disabled={loading}
      />

      <TextField
        label="Nombre de la ruta *"
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
        fullWidth
        disabled={loading}
      />

      <Autocomplete
        value={tipoServicio.find((t) => t.id === formValues.type) ?? null}
        options={tipoServicio}
        getOptionLabel={(option) => option.label}
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        onChange={(_, value) => {
          // @ts-ignore
          setValue("type", value?.id || null, {
            shouldValidate: true,
          });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tipo de servicio *"
            variant="outlined"
            error={!!errors.type}
            helperText={errors.type?.message}
            disabled={loading}
          />
        )}
        disabled={loading}
      />

      <Autocomplete
        value={
          cities
            .find((c) => c.id === formValues.cityId)
            ?.employees?.find((e) => e.id === formValues.driverId) || null
        }
        options={
          cities.find((c) => c.id === formValues.cityId)?.employees || []
        }
        getOptionLabel={(option) =>
          [option.firstName, option.lastName].filter(Boolean).join(" ")
        }
        isOptionEqualToValue={(option, value) => option.id === value?.id}
        onChange={(_, value) => {
          setValue("driverId", value?.id || null, { shouldValidate: true });
        }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Chofer *"
            variant="outlined"
            error={!!errors.driverId}
            helperText={errors.driverId?.message}
            disabled={!formValues.cityId || loading}
          />
        )}
        disabled={!formValues.cityId || loading}
      />

      <TextField
        label="Capacidad *"
        type="number"
        variant="outlined"
        error={!!errors.capacity}
        helperText={errors.capacity?.message}
        {...register("capacity", { valueAsNumber: true })}
        fullWidth
        InputProps={{ inputProps: { min: 1 } }}
        onKeyDown={(e) =>
          ["e", "E", "+", "-"].includes(e.key) && e.preventDefault()
        }
        disabled={loading}
      />

      <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2, mt: 2 }}>
        <Button
          variant="outlined"
          onClick={() => onClose(false)}
          disabled={loading}
        >
          Cancelar
        </Button>
        <Button variant="contained" type="submit" disabled={loading}>
          {loading ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </Box>
    </Card>
  );
}
