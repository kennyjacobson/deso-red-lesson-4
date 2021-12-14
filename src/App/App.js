import React, {useState} from 'react'
import './App.css'
// import { ThemeProvider } from '@mui/material';
import {  ThemeProvider, createTheme } from '@mui/material/styles';
import Layout from '../Components/layout'
import DesignTokens from './designTokens'
import { CssBaseline } from '@mui/material';


function App() {
  const [mode, setMode] = useState('light')
  const toggleColorMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light')
  }

  const theme = React.useMemo(() => createTheme(DesignTokens(mode)), [mode]);

  return (
    <>
      <ThemeProvider theme={theme}>
       <CssBaseline />
        <Layout colorPaletteMode={mode} toggleColorMode={toggleColorMode}></Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
