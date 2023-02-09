import { createTheme } from "@mui/material/styles";

const globalPalette = createTheme({
  palette: {
    primary: {
      main: '#006A65',
      contastText: '#FFFFFF',
    },
    error: {
      main: '#BA1A1A',
      contrastText: '#FFFFFF',
    },
    background: {
      main: '#FEFCF4',
      contrastText: '#48473C',
    },
    surface: {
      main: '#FEFCF4',
      contrastText: '#48473C',
    },
    surfaceVariant: {
      main: '#E5E3D1',
      contrastText: '#48473C',
      outline: '#79786A',
    },
    neutral: {
      main: '#FEFCF4',
      0: '#000000',
      10: '#1B1C17',
      20: '#30312C',
      30: '#464742',
      40: '#5E5F59',
      50: '#777771',
      60: '#91918A',
      70: '#ACABA4',
      80: '#C7C7BF',
      90: '#E4E3DC',
      95: '#F2F1E9',
      99: '#FEFCF4', // main
      100: '#FFFFFF',
      contrastText: '#48473C'
    },
    neutralVariant: {
      main: '#E5E3D1',
      0: '#000000',
      10: '#1C1C12',
      20: '#313126',
      30: '#48473C',
      40: '#605F52',
      50: '#79786A', // outline
      60: '#939183',
      70: '#ADAC9C',
      80: '#C9C7B6',
      90: '#E5E3D1', // main
      95: '#F4F1E0',
      99: '#FFFBFF',
      100: '#FFFFFF',
      contrastText: '#48473C'
    }
  },
  typography: {
    fontFamily: "'Noto Sanc TC', sans-serif",
    displayLarge: {
      fontSize: '57px',
      lineHeight: '64px',
      fontWeight: '500',
    },
    displayMedium: {
      fontSize: '45px',
      lineHeight: '52px',
      fontWeight: '500',
    },
    displaySmall: {
      fontSize: '36px',
      lineHeight: '44px',
      fontWeight: '500',
    },
    headlineLarge: {
      fontSize: '32px',
      lineHeight: '40px',
      fontWeight: '400',
    },
    headlineMedium: {
      fontSize: '28px',
      lineHeight: '36px',
      fontWeight: '400',
    },
    headlineSmall: {
      fontSize: '24px',
      lineHeight: '32px',
      fontWeight: '400',
    },
    titleLarge: {
      fontSize: '22px',
      lineHeight: '28px',
      fontWeight: '500',
    },
    titleMedium: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '500',
      letterSpacing: '0.1px',
    },
    titleSmall: {
      fontSize: '12px',
      lineHeight: '20px',
      fontWeight: '500',
      letterSpacing: '0.15px',
    },
    labelLarge: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '700',
      letterSpacing: '0.1px',
    },
    labelMedium: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '700',
      letterSpacing: '0.5px',
    },
    labelSmall: {
      fontSize: '11px',
      lineHeight: '16px',
      letterSpacing: '0.5px',
    },
    bodyLargeHighlighted: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '500',
      letterSpacing: '0.15px',
    },
    bodyLarge: {
      fontSize: '16px',
      lineHeight: '24px',
      fontWeight: '400',
      letterSpacing: '0.15px',
    },
    bodyMediumHighlighted: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '500',
      letterSpacing: '0.25px',
    },
    bodyMedium: {
      fontSize: '14px',
      lineHeight: '20px',
      fontWeight: '400',
      letterSpacing: '0.25px',
    },
    bodySmallHighlighted: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '500',
      letterSpacing: '0.14px',
    },
    bodySmall: {
      fontSize: '12px',
      lineHeight: '16px',
      fontWeight: '400',
      letterSpacing: '0.14px',
    },
  }
});

const theme = createTheme({

}, globalPalette);

export default theme;