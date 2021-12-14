import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
// import SkipPreviousIcon from '@mui/icons-material/SkipPrevious';
// import PlayArrowIcon from '@mui/icons-material/PlayArrow';
// import SkipNextIcon from '@mui/icons-material/SkipNext';
import { Avatar } from '@mui/material';

export default function UserCard({username, userBio,  PublicKeyBase58Check}) {
  const avatarUrl = `https://diamondapp.com/api/v0/get-single-profile-picture/${PublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`
  return (
    <Card sx={{ display: 'flex', bgcolor: (theme) => theme.palette.secondary.main, }} >
        
      <Avatar aria-label="recipe" src={avatarUrl} sx={{ width: 60, height: 60, mr: 1, ml: 3, mt: 3 }}>
                *
            </Avatar>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Typography component="div" variant="h5">
            {username}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" component="div">
            {userBio}
          </Typography>
        </CardContent>
        {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
          <IconButton aria-label="previous">
            {theme.direction === 'rtl' ? <SkipNextIcon /> : <SkipPreviousIcon />}
          </IconButton>
          <IconButton aria-label="play/pause">
            <PlayArrowIcon sx={{ height: 38, width: 38 }} />
          </IconButton>
          <IconButton aria-label="next">
            {theme.direction === 'rtl' ? <SkipPreviousIcon /> : <SkipNextIcon />}
          </IconButton>
        </Box> */}
      </Box>
      
    </Card>
  );
}
