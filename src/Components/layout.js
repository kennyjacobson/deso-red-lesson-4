import React, { useState, useEffect } from 'react'
import { AppBar,   Grid,  IconButton,    Paper,  Toolbar, Typography } from '@mui/material'
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import MenuIcon from '@mui/icons-material/Menu'
import Main from '../Pages/main'
import PostComments from '../Pages/postComments'
import { styled } from '@mui/system'
import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import DesoApi from '../Deso/desoApi'


const ToolBarPadder = styled('div')({
    // necessary for content to be below app bar
    height: '5em',
})

// const defaultAutocompleteOptions =  [
//     { label: 'KennyJ', id: 321654 },
//     { label: 'MelanieJ', id: 321654 },
//     { label: 'KennyJTest', id: 321654 },
// ]

function Layout({colorPaletteMode, toggleColorMode}) {

    const [childSearchFunction, setChildSearchFunction] = useState(null)
    const [value, setValue] = useState("")
    const [autocompleteOptions, setAutocompleteOptions] = useState([])
    const [inputValue, setInputValue] = useState('')

    useEffect(() => {
        fetchProfilesPartialMatch(inputValue)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    const fetchProfilesPartialMatch = async (partialName) => {
        if(partialName){
            const desoApi = new DesoApi()
            const returnedProfileData = await desoApi.getProfilesPartialMatch(partialName)
            if(returnedProfileData.ProfilesFound){
                console.log(returnedProfileData)
                const dropdownValues = profileToDropdown(returnedProfileData.ProfilesFound)
                setAutocompleteOptions(dropdownValues)
            }
        }
    }

    const profileToDropdown = (profileData) => {
        const dropdownValues = profileData.map(function(item) {
            return {label : item.Username, id : item.PublicKeyBase58Check}
        })
        console.log(dropdownValues)
        return dropdownValues
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
                        <Grid item xs={2}>
                            <Typography   >deso:red</Typography>
                        </Grid>
                        <Grid item xs={7} textAlign="center"> 
                            
                            {/* <InputBase
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
                                /> */}

                        <Autocomplete
                            value={value}
                            onChange={(event, newValue) => {
                                setValue(newValue)
                                console.log(newValue)
                                if(newValue) {
                                    console.log(newValue.label)
                                    childSearchFunction(newValue.label)
                                }
                            }}
                            inputValue={inputValue}
                            onInputChange={(event, newInputValue) => {
                                setInputValue(newInputValue)
                                //alert(newInputValue)
                                console.log(newInputValue)
                                if(newInputValue){
                                    console.log(newInputValue)
                                    fetchProfilesPartialMatch(newInputValue)
                                }
                            }}
                            id="controllable-states-demo"
                            options={autocompleteOptions}
                            sx={{ width: 300, }}
                            renderInput={(params) => <TextField {...params} label="Search" />}
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
                    <Route exact path="/" element={<Main   setSearchFunction={(f) => {setChildSearchFunction(f)}} />}  />
                    <Route exact path="/:id" element={<Main   setSearchFunction={(f) => {setChildSearchFunction(f)}} />}  />
                    <Route path="/postComments/:id" element={<PostComments    setSearchFunction={(f) => {setChildSearchFunction(f)}}/>} />   
                   
                </Routes>
                </Paper>
            </main>
            </Router>                            
        </div>
    )
}

export default Layout