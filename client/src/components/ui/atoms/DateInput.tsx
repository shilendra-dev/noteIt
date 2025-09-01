import { useState } from "react";
import { TextField, type TextFieldProps } from "@mui/material";
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

type DateInputProps = Omit<TextFieldProps, "variant"> & {
  id: string;
  label: string;
  variant?: "filled" | "outlined" | "standard";
};

export default function DateInput({
  id,
  label,
  variant = "outlined",
  ...rest
}: DateInputProps) {
  const [value, setValue] = useState<any>(null);

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DatePicker
        value={value}
        onChange={(newValue) => setValue(newValue)}
        slotProps={{
          textField: {
            id,
            label,
            variant,
            fullWidth: true,
            sx: {
              borderRadius: "1rem",
              "& .MuiOutlinedInput-root": {
                borderRadius: "1rem",
              },
              "& .MuiInputLabel-root": {
                backgroundColor: "white",
                px: 1,
              },
            },
            ...rest,
          },
        }}
      />
    </LocalizationProvider>
  );
}
