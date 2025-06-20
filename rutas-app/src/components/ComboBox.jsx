import { Autocomplete, TextField } from "@mui/material";

export default function ComboBox({ options, label }) {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}
