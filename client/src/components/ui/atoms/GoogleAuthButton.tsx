import Button, { type ButtonProps } from "@mui/material/Button";


export default function CustomButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      variant="outlined"
      sx={{
        bgcolor: "#fff",
        borderRadius: ".5rem"
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
