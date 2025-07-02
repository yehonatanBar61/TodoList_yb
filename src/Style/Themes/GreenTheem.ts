import { createTheme } from '@mui/material/styles';

export const greenTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#276732', contrastText: '#fff' },
    secondary: { main: '#266b12', contrastText: '#6eff6e' },
    background: { default: '#2e2f33', paper: '#273029' },
    text: { primary: '#ffffff' },
  },
});

export const darkTheme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#276732', contrastText: '#fff' },
    secondary: { main: '#266b12', contrastText: '#fff' },
    background: { default: '#f2f2f2', paper: '#fff' },
    text: { primary: '#000000' },
  },
});