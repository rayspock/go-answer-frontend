import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import React from "react";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#607d8b"
    },
    secondary: {
      main: "#cfd8dc"
    }
  },
  typography: {
    fontSize: 14,
    fontFamily: "Barlow",
    h2: {
      fontStyle: "normal",
      fontWeight: 300,
      fontSize: "30px",
      lineHeight: "36px"
    },
  },
  shape: {
    borderRadius: 10
  }
});

export default function RootComponent(props: { children?: React.ReactNode }) {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
}
