import { createTheme } from "@mui/material/styles";

// Define your color palette
const palette = {
  primary: {
    main: "#4f46e5",       // Indigo
    light: "#6366f1",
    dark: "#4338ca",
    contrastText: "#ffffff",
  },
  secondary: {
    main: "#f43f5e",       // Pink/Red
    light: "#f87171",
    dark: "#be123c",
    contrastText: "#ffffff",
  },
  error: {
    main: "#dc2626",
    light: "#f87171",
    dark: "#991b1b",
    contrastText: "#ffffff",
  },
  warning: {
    main: "#f59e0b",
    light: "#fcd34d",
    dark: "#b45309",
    contrastText: "#000000",
  },
  info: {
    main: "#0ea5e9",
    light: "#38bdf8",
    dark: "#0369a1",
    contrastText: "#ffffff",
  },
  success: {
    main: "#16a34a",
    light: "#4ade80",
    dark: "#166534",
    contrastText: "#ffffff",
  },
  background: {
    default: "#f9fafb",
    paper: "#ffffff",
  },
  text: {
    primary: "#111827",
    secondary: "#6b7280",
    disabled: "#9ca3af",
  },
};

const theme = createTheme({
  palette,
  shape: {
    borderRadius: 12, // Default border-radius for buttons, inputs, etc.
  },
  typography: {
    fontFamily: "'Inter', sans-serif",
    h1: { fontWeight: 700 },
    h2: { fontWeight: 700 },
    h3: { fontWeight: 600 },
    h4: { fontWeight: 600 },
    h5: { fontWeight: 500 },
    h6: { fontWeight: 500 },
    body1: { fontWeight: 400 },
    body2: { fontWeight: 400 },
  },
  components: {
    // Global overrides for MUI components
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none", // Disable uppercase
          borderRadius: 12,
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined",
        size: "small",
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        rounded: {
          borderRadius: 12,
        },
      },
    },
  },
});

export default theme;
