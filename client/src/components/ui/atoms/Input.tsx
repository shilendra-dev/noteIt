import { TextField, type TextFieldProps } from "@mui/material";

type InputProps = TextFieldProps & {
  id: string;
  label: string;
  variant?: "filled" | "outlined" | "standard";
};

export default function Input({
  id,
  label,
  variant = "outlined",
  type = "text",
  ...rest
}: InputProps) {
  return (
    <TextField
      id={id}
      label={label}
      variant={variant}
      type={type}
      {...rest}
      sx={{
        borderRadius: "12px", // makes it more rounded
        "& .MuiOutlinedInput-root": {
          borderRadius: "0.5rem", // ensures outlined variant is rounded
        },
        "& .MuiFilledInput-root": {
          borderRadius: "0.5rem", // ensures filled variant is rounded
        },
        "& .MuiInputBase-root": {
          fontFamily: "Inter, sans-serif", // ensure Inter font is applied
        },
      }}
    />
  );
}
