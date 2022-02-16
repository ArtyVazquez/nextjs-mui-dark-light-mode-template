import { useState, createContext, useMemo, useContext, useEffect } from 'react';
import ResponsiveDrawer from '../Components/NavbarDrawer/ResponsiveDrawer'
import Box from '@mui/material/Box';
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import ListItemIcon from '@mui/material/ListItemIcon';
import { useCookies } from 'react-cookie';
import '../styles/globals.css'

const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Component that will toggle light/dark mode themes...
function ThemeMode() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (      
      <ListItemIcon  onClick={() => colorMode.toggleColorMode(true)} color="inherit">
        {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
      </ListItemIcon>
  );
}

function MyApp({ Component, pageProps }) {
  const [cookies, setCookie] = useCookies(['theme']); // save theme mode in cookie
  const [mode, setMode] = useState('light'); // light mode by default
  const colorMode = useMemo(
    () => ({
      toggleColorMode: (isToogle) => {
        if (isToogle){
          setCookie('theme', cookies.theme === 'light'? 'dark':'light');
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
        } else {
          setMode(cookies.theme);
        }
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  // set the theme to be whats in the theme cookie
  useEffect(() => {
    if (cookies.theme === undefined)
      setCookie('theme', 'light', {path: '/'});

    colorMode.toggleColorMode(false);
  },[]);

  return (
      <ColorModeContext.Provider value={colorMode}>
        <ThemeProvider theme={theme}>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <ResponsiveDrawer mode={<ThemeMode />}/>
            <Box sx={{
              height: '100vh',
              width: '100vw',
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: 'background.default',
              color: 'text.primary'
              }}>
              <Component {...pageProps} />
            </Box>
          </div>
        </ThemeProvider>
      </ColorModeContext.Provider>
  )
}

export default MyApp;