
import React from 'react';
import { Autocomplete, TextField } from '@mui/material';
import top100Films from './Cities';

export default function ComboBox({options, label}) {
  return (
    <Autocomplete
      options={options}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

