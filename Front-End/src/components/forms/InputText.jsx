import React from "react";
import TextField from "@mui/material/TextField";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

export const InputText = ({
  label,
  row,
  variant = "outlined",
  multiline,
  ref,
  ...props
}) => {
  return (
    <TextField
      label={label}
      variant={variant}
      fullWidth
      multiline={multiline}
      size="small"
      inputRef={ref}
      rows={row}
      {...props}
    />
  );
};

export const SelectInput = ({
  label,
  name,
  value,
  onChange,
  options = [],
  placeholder = "Select option",
  fullWidth = true,
  disabled = false,
}) => {
  return (
    <FormControl fullWidth={fullWidth} margin="normal">
      <InputLabel>{label}</InputLabel>

      <Select
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        disabled={disabled}
      >
        <MenuItem value="" disabled>
          {placeholder}
        </MenuItem>

        {options.map((item, index) => (
          <MenuItem key={index} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export const ButtonDy = ()=>{
  
}
