import './App.css';
import { useEffect } from 'react'
import { ThemeProvider as ThemeMaterial} from '@mui/material/styles';
import { ThemeProvider as ThemeStyled} from 'styled-components';
import CssBaseline from '@mui/material/CssBaseline';


import Router from './routers/Router';
import theme from './styles/theme';

function App() {

  useEffect(() => {
    console.log(process.env.REACT_APP_BACKEND)
  }, []);

  return (
    <ThemeMaterial theme = {theme}>
      <CssBaseline />
      <ThemeStyled theme = {theme}>
        <Router />
      </ThemeStyled>
    </ThemeMaterial>
  );
}

export default App;
