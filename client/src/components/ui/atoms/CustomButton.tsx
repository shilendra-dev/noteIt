import Button, { type ButtonProps } from "@mui/material/Button";

export default function CustomButton({ children, ...props }: ButtonProps) {
  return (
    <Button
      variant="contained"
      sx={{
        bgcolor: "#367AFF",
        "&:hover": { bgcolor: "#255BE6" },
        borderRadius: ".5rem"
      }}
      {...props}
    >
      {children}
    </Button>
  );
}
