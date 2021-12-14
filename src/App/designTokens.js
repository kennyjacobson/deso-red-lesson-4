import {  deepOrange, grey,   blueGrey } from "@mui/material/colors";

const DesignTokens = (mode) => ({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            // palette values for light mode
            primary: blueGrey,
            secondary: {
              main: "#ffffff",
            },
            background: {
              default: grey[100],
              paper: grey[100],
              
            },
            
            
          }
        : {
            // palette values for dark mode
            primary: deepOrange,
            secondary: {
              main: grey[900],
            },
            background: {
                      default: "#000000",
                      paper: "#000000",
                    },

          }),
    },
  });

  export default DesignTokens


//   {
//     // palette values for light mode
//     primary: cyan,
//     divider: cyan[900],
//     text: {
//       primary: grey[900],
//       secondary: grey[800],
//     },
//   }
// : {
//     // palette values for dark mode
//     primary: deepOrange,
//     divider: deepOrange[700],
//     background: {
//       default: deepOrange[900],
//       paper: deepOrange[900],
//     },
//     text: {
//       primary: '#fff',
//       secondary: grey[500],
//     },
//   }),