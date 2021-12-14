import React, { useState } from 'react'
import { AppBar,   Grid,  IconButton,  Paper,  Toolbar, Typography } from '@mui/material';
// import { makeStyles } from '@mui/styles';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import Main from '../Pages/main';
import PostComments from '../Pages/postComments';
import { styled } from '@mui/system';
import { InputBase } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import {
    BrowserRouter as Router,
    Routes,
    Route
  } from "react-router-dom";

// const useStyles = makeStyles((theme) => ({
//     root: {
//       display: 'flex',
//     },
//     main: {
//       width: '100%',
//     },
//     modalStyle1:{
//       position:'absolute',
//       top:'10%',
//       left:'10%',
//       overflow:'scroll',
//       height:'100%',
//       display:'block'
//     },

//   }))

const ToolBarPadder = styled('div')({
    // necessary for content to be below app bar
    height: '5em',
})

function Layout({colorPaletteMode, toggleColorMode}) {
    // const classes = useStyles()
    const [searchValue, setSearchValue] = useState("")
    const [childSearchFunction, setChildSearchFunction] = useState(null)

    const handleChange = e => {
        setSearchValue(e.target.value);
    }

    const handleKeypress = e => {
        //alert(e.target.value)
        if (e.key === "Enter") {
            childSearchFunction(e.target.value)
        }
    }

    return (
        <div >
            <AppBar position="fixed" >
                <Toolbar>
                    
                    <Grid container alignItems="center" spacing={1}>
                        <Grid item xs={1}>
                            <IconButton >
                                <MenuIcon />
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <Typography   >deso:red</Typography>
                        </Grid>
                        <Grid item xs={8} textAlign="center"> 
                            
                            <InputBase
                                placeholder="Search"
                                value={searchValue}
                                onChange={handleChange}
                                onKeyPress={handleKeypress}
                                sx={{
                                    opacity: '0.6',
                                    padding: '0px 18px',
                                    fontSize: '1.2rem',
                                    '&:hover': {
                                        backgroundColor: '#777'
                                    },
                                    '& .MuiSvgIcon-root': {
                                        marginRight: '8px'
                                    },
                                    border: '1px solid #222', 
                                    borderRadius: '10px'
                                    }}
                                startAdornment={<SearchIcon />}
                                />
                        </Grid>
                        <Grid item xs={2}>
                            {colorPaletteMode} mode
                            <IconButton sx={{ ml: 1 }} onClick={toggleColorMode}  color="inherit">
                                {colorPaletteMode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Router>
            <main  >
                <ToolBarPadder/>
                <Paper>
                <Routes>
                    <Route exact path="/" element={<Main searchValue={searchValue}  setSearchFunction={(f) => {setChildSearchFunction(f)}} />}  />
                    <Route exact path="/:id" element={<Main searchValue={searchValue}  setSearchFunction={(f) => {setChildSearchFunction(f)}} />}  />
                    <Route path="/postComments/:id" element={<PostComments  searchValue={searchValue}  setSearchFunction={(f) => {setChildSearchFunction(f)}}/>} />   
                   
                </Routes>
                </Paper>
            </main>
            </Router>                            
        </div>
    )
}

export default Layout