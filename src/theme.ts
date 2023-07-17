import { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

export default (mode: PaletteMode) => createTheme({
  palette: {
    mode,
    primary: {
      main: "rgb(108,34,7)",
    },
    secondary: {
      main: "#fff",
    },
    info: {
      main: "#121212",
    },
  },
});