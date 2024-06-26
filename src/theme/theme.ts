import { createTheme } from "@mui/material";
const GREY = {
    0: '#FFFFFF',
    100: '#F9FAFB',
    200: '#F4F6F8',
    300: '#DFE3E8',
    400: '#C4CDD5',
    500: '#919EAB',
    600: '#637381',
    700: '#454F5B',
    800: '#212B36',
    900: '#161C24',
};

const PRIMARY = {
    lighter: '#61AEB7',
    light: '#1D7E8A',
    main: '#072834',
    dark: '#051C23',
    darker: '#030F12',
    contrastText: '#FFFFFF',
};

const SECONDARY = {
    lighter: '#FFE56F',
    light: '#FFC83D',
    main: '#FAB32B',
    dark: '#C38320',
    darker: '#7D5911',
    contrastText: '#FFFFFF',
};
// const PRIMARY = {
//   lighter: '#C8FACD',
//   light: '#5BE584',
//   main: '#00AB55',
//   dark: '#007B55',
//   darker: '#005249',
//   contrastText: '#FFFFFF',
// };

// const SECONDARY = {
//   lighter: '#D6E4FF',
//   light: '#84A9FF',
//   main: '#3366FF',
//   dark: '#1939B7',
//   darker: '#091A7A',
//   contrastText: '#FFFFFF',
// };

const INFO = {
    lighter: '#CAFDF5',
    light: '#61F3F3',
    main: '#00B8D9',
    dark: '#006C9C',
    darker: '#003768',
    contrastText: '#FFFFFF',
};

const SUCCESS = {
    lighter: '#D8FBDE',
    light: '#86E8AB',
    main: '#36B37E',
    dark: '#1B806A',
    darker: '#0A5554',
    contrastText: '#FFFFFF',
};

const WARNING = {
    lighter: '#FFF5CC',
    light: '#FFD666',
    main: '#FFAB00',
    dark: '#B76E00',
    darker: '#7A4100',
    contrastText: GREY[800],
};

const ERROR = {
    lighter: '#FFE9D5',
    light: '#FFAC82',
    main: '#FF5630',
    dark: '#B71D18',
    darker: '#7A0916',
    contrastText: '#FFFFFF',
};
export const theme = createTheme({
    palette: {
        primary: {
            main: '#228B22',
        },
        secondary: {
            main: GREY["900"],
        },
    },
    typography: {
        fontFamily: 'Arial',
        fontSize: 16,
        fontWeightRegular: "regular",
        fontWeightMedium: "medium",

    },
}); 