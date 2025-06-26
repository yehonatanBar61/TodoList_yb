import { createTheme } from '@mui/material/styles';

export const greenTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0c7c0c' },
    secondary: { main: '#266b12' },
    background: { default: '#2e2f33', paper: '#2e2f33' },
    text: { primary: '#ffffff' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#266b12' },
    secondary: { main: '#0c7c0c' },
    background: { default: '#266b12', paper: '#0c7c0c' },
    text: { primary: '#0c7c0c' },
  },
});