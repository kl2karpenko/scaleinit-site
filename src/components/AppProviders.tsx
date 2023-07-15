import React, { useState } from "react";
import createCache from "@emotion/cache";

import { PaletteMode } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import createTheme from "../theme";
import { AppContext } from "./AppContext";
import { IDialogProps } from "../interfaces/IDialogProps";

const muiCache = createCache({
  key: "mui",
  prepend: true,
});

export default function AppProviders({ children }: { children: React.ReactNode }) {
  const [dialogProps, setDialogProps] = useState<IDialogProps>({ open: false });
  const [mode, setMode] = React.useState<PaletteMode>("light");
  const theme = createTheme(mode);

  return (
    <ThemeProvider theme={theme}>
      <AppContext.Provider
        value={{
          dialogProps,
          setDialogProps,
          setMode
        }}
      >
        {children}
      </AppContext.Provider>
    </ThemeProvider>
  );
}
