import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, Card, TextField } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  cityId: z.number({
    message: "Ciudad es requerida",
  }),
  firstName: z
    .string()
    .min(1, "Nombre es requerido")
    .regex(/^[a-zA-ZñÑ]+$/, "Nombre solo puede contener letras y espacios"),
  lastName: z
    .string()
    .min(1, "Apellido Paterno es requerido")
    .regex(/^[a-zA-ZñÑ]+$/, "Nombre solo puede contener letras y espacios"),
  motherLastName: z
    .string()
    .min(1, "Apellido Materno es requerido")
    .regex(/^[a-zA-ZñÑ]+$/, "Nombre solo puede contener letras y espacios"),
  birthDate: z
    .date({
      message: "Fecha de Nacimiento es requerida",
    })
    .refine((date) => date <= new Date(), {
      message: "Fecha de Nacimiento no puede ser futura",
    })
    .refine(
      (date) => {
        const today = dayjs();
        const birthDate = dayjs(date);
        const age = today.diff(birthDate, "year");
        return age >= 18;
      },
      {
        message: "Debe ser mayor de 18 años",
      }
    ),
  salary: z.number().gt(0, "Sueldo debe ser mayor a $0"),
});

export default function AltaEmpleados({ onClose }) {
  const [cities, setCities] = useState([]);
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cityId: null,
      firstName: "",
      lastName: "",
      motherLastName: "",
      birthDate: null,
      salary: 0,
    },
  });

  const formValues = watch();

  useEffect(() => {
    axios.get("/cities").then((response) => {
      setCities(response.data);
    });
  }, []);

  return (
    <Card className="w-4xl mx-auto px-6 py-8 shadow-lg overflow-y-scroll">
      <Box
        className="flex flex-col gap-6 overflow-y-scroll"
        component="form"
        onSubmit={handleSubmit(async (data) => {
          await axios.post("/employees", {
            ...data,
            birthDate: dayjs(data.birthDate).format("YYYY-MM-DD"),
          });
          alert("¡Empleado creado exitosamente!");
          reset();
        })}
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          ALTA DE EMPLEADOS
        </h1>
        <Autocomplete
          value={cities.find((c) => c.id === formValues.cityId) ?? null}
          onChange={(_, newValue) => {
            setValue("cityId", newValue?.id ?? null, {
              shouldValidate: true,
            });
          }}
          getOptionLabel={(option) => option.name}
          getOptionKey={(option) => option.id}
          options={cities}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ciudad"
              variant="outlined"
              error={!!errors.cityId}
              helperText={errors.cityId?.message}
              fullWidth
            />
          )}
        />
        <TextField
          label="Nombre"
          error={!!errors.firstName}
          helperText={errors.firstName?.message}
          {...register("firstName")}
          fullWidth
        />
        <TextField
          label="AP. Paterno"
          error={!!errors.lastName}
          helperText={errors.lastName?.message}
          {...register("lastName")}
          fullWidth
        />
        <TextField
          label="AP. Materno"
          error={!!errors.motherLastName}
          helperText={errors.motherLastName?.message}
          {...register("motherLastName")}
          fullWidth
        />
        <TextField
          type="date"
          label="Fecha de Nacimiento"
          error={!!errors.birthDate}
          helperText={errors.birthDate?.message}
          variant="outlined"
          margin="normal"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
          }}
          {...register("birthDate", {
            valueAsDate: true,
          })}
          fullWidth
        />
        <TextField
          label="Sueldo"
          type="number"
          slotProps={{
            inputLabel: {
              shrink: true,
            },
            htmlInput: {
              min: 0,
            },
            input: {
              startAdornment: <span className="text-gray-500">$</span>,
            },
          }}
          onKeyDown={(e) => {
            if (["e", "E", "+", "-"].includes(e.key)) {
              e.preventDefault();
            }
          }}
          error={!!errors.salary}
          helperText={errors.salary?.message}
          {...register("salary", { valueAsNumber: true })}
          variant="outlined"
          margin="normal"
          fullWidth
        />
        <div className="flex justify-end gap-4">
          <Button variant="contained" type="submit">
            Guardar
          </Button>
          <Button onClick={onClose} type="button">
            Salir
          </Button>
        </div>
      </Box>
    </Card>
  );
}
