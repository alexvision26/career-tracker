import { createMuiTheme } from "@material-ui/core";

export const theme = createMuiTheme({
    palette: {
      primary: {
        main: '#7000ff',
      },
      secondary: {
        main: '#4fc3f7',
      },
    },
    regular: {
      display: "flex"
    },
    props: {
        MuiTextField: {
            variant: 'outlined'
        },
    },
    typography: {
        fontFamily: '"Roboto", sans-serif',
    }
  })