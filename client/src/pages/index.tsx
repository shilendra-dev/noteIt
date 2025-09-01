import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "../styles/theme.js";

export default function HomePage() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <h1 className="bg-amber-500">Test</h1>
    </ThemeProvider>
  )
}
