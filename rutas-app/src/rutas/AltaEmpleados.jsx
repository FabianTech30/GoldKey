import { zodResolver } from "@hookform/resolvers/zod";
import { Autocomplete, Box, Button, Card, TextField } from "@mui/material";
import dayjs from "dayjs";
import { useForm } from "react-hook-form";
import { z } from "zod";
import cities from "../components/Cities";

const formSchema = z.object({
  city: z.string().min(1, "Ciudad es requerida"),
  firstName: z.string().min(1, "Nombre es requerido"),
  lastName: z.string().min(1, "Apellido Paterno es requerido"),
  middleName: z.string().min(1, "Apellido Materno es requerido"),
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
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      city: "",
      firstName: "",
      lastName: "",
      middleName: "",
      birthDate: null,
      salary: 0,
    },
  });

  return (
    <Card className="w-4xl mx-auto px-6 py-8 shadow-lg overflow-y-scroll">
      <Box
        className="flex flex-col gap-6 overflow-y-scroll"
        component="form"
        onSubmit={handleSubmit((data) => {
          console.log("Form submitted with data:", data);
          reset();
        })}
      >
        <h1 className="text-center text-3xl font-bold text-gray-800">
          ALTA DE EMPLEADOS
        </h1>
        <Autocomplete
          options={cities}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Ciudad"
              variant="outlined"
              error={!!errors.city}
              helperText={errors.city?.message}
              {...register("city")}
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
          error={!!errors.middleName}
          helperText={errors.middleName?.message}
          {...register("middleName")}
          fullWidth
        />
        {/* <DatePicker label="Fecha de Nacimiento" className="w-full" /> */}
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
