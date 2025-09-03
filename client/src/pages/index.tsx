import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme.js";
import { Navigate } from "react-router";

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navigate to="/signin" />
    </ThemeProvider>
  )
}
