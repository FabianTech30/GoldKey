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
      .regex(/^[a-zA-ZñÑ]+$/, "Nombre solo puede contener letras y espacios"),
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
    if (data.type === "ITEMS") {
      if (data.capacity > 100) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: "Capacidad para servicio personal no puede ser mayor a 100",
          path: ["capacity"],
        });
      }
    }

    if (data.type === "PERSONAL") {
      if (data.capacity > 34) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message:
            "Capacidad para servicio de articulos no puede ser mayor a 34",
          path: ["capacity"],
        });
      }
    }
  });

export default function AltaRutas({ onClose }) {
  const [cities, setCities] = useState([]);
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

  useEffect(() => {
    axios.get("/cities").then((response) => {
      setCities(response.data);
    });
  }, []);

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
      onSubmit={handleSubmit(async (data) => {
        await axios.post("/routes", data);
        alert("Ruta creada correctamente");
        reset();
      })}
    >
      <h1 className="text-3xl font-bold text-gray-800 text-center">
        ALTA DE RUTAS
      </h1>
      <Autocomplete
        value={cities.find((c) => c.id === formValues.cityId) ?? null}
        onChange={(_, value) => {
          setValue("cityId", value?.id || null, {
            shouldValidate: true,
          });
          setValue("driverId", null);
        }}
        options={cities}
        getOptionLabel={(option) => option.name}
        getOptionKey={(option) => option.id}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Selecciona una ciudad"
            variant="outlined"
            error={!!errors.cityId}
            helperText={errors.cityId?.message}
          />
        )}
      />
      <TextField
        label="Ingresa el nombre de la ruta"
        variant="outlined"
        error={!!errors.name}
        helperText={errors.name?.message}
        {...register("name")}
        fullWidth
      />
      <Autocomplete
        value={tipoServicio.find((t) => t.id === formValues.type) ?? null}
        options={tipoServicio}
        getOptionLabel={(option) => option.label}
        getOptionKey={(option) => option.id}
        onChange={(_, value) => {
          // @ts-ignore
          setValue("type", value?.id || null, {
            shouldValidate: true,
          });
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
        disabled={!formValues.cityId}
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
          Guardar
        </Button>
        <Button type="button" onClick={onClose}>
          Cancelar
        </Button>
      </Box>
    </Card>
  );
}
