import { createTheme } from '@mui/material/styles';

export const greenTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#0c7c0c', contrastText: '#fff' },
    secondary: { main: '#266b12', contrastText: '#fff' },
    background: { default: '#2e2f33', paper: '#2e2f33' },
    text: { primary: '#ffffff' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0c7c0c', contrastText: '#fff' },
    secondary: { main: '#266b12', contrastText: '#fff' },
    background: { default: '#f2f2f2', paper: '#0c7c0c' },
    text: { primary: '#000000' },
  },
});