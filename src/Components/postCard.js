import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {Link} from "react-router-dom";
import { CardActionArea } from '@mui/material';
import DiamondIcon from '@mui/icons-material/Diamond';
import ModeCommentIcon from '@mui/icons-material/ModeComment';


let dollarUSLocale = Intl.NumberFormat('en-US')
function urlify(text) {
    if(!text) return
    const urlRegex = /(https?:\/\/[^\s]+)/g;
    return text.split(urlRegex)
       .map(part => {
          if(part.match(urlRegex)) {
             return <a href={part} target="_blank" rel="noreferrer">{part}</a>;
          }
          return part;
       });
  }

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function PostCard({username,coinPrice,postText,PublicKeyBase58Check, ImageURLs,PostHashHex,hideUserInfo=true, likeCount, diamondCount, commentCount}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const avatarUrl = `https://diamondapp.com/api/v0/get-single-profile-picture/${PublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`
  
  
  return (
    <Card sx={{bgcolor: (theme) => theme.palette.secondary.main}}>
      {
        (hideUserInfo) ? (
          <>
          </>
        ):(
          <CardActionArea component={Link} to={`/${username}`} sx={{ textDecoration: 'none' }}>
          <CardHeader
            avatar={
              <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" src={avatarUrl} >
                *
              </Avatar>
            }
            action={
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            }
            title={username}
            subheader={`~$ ${dollarUSLocale.format(coinPrice/10000000)}`}
            
          />
          </CardActionArea>

        )
      }
     
      {/* <CardMedia
        component="img"
        height="194"
        image="/logo512.png"
        alt="Paella dish"
      /> */}
      <CardActionArea component={Link} to={`/postComments/${PostHashHex}`} sx={{ textDecoration: 'none' }}>
      <CardContent  >
     
        <Typography variant="body2" color="text.secondary" sx={{ whiteSpace: 'pre-line' }} >
          {urlify(postText)}
        </Typography>
  
      </CardContent>
      </CardActionArea>

      {
          (ImageURLs) ?
          ImageURLs.map((imageUrl) => (
            <CardMedia
                component="img"
                image={imageUrl}
            />
          ))
          :(
              <></>
          )
      }

      <CardActions disableSpacing>
        <IconButton aria-label="likes" sx={{mr: 5}}>
          <FavoriteIcon /><Typography sx={{ml: 1}}>{likeCount}</Typography>
        </IconButton>
        <IconButton aria-label="share" sx={{mr: 5}}>
          <ModeCommentIcon /><Typography sx={{ml: 1}}>{commentCount}</Typography>
        </IconButton>
        <IconButton aria-label="share" sx={{mr: 5}}>
          <DiamondIcon/><Typography sx={{ml: 1}}>{diamondCount}</Typography>
        </IconButton>
        
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {/* <CardContent>
          <Typography paragraph>Method:</Typography>
          <Typography paragraph>
            Heat 1/2 cup of the broth in a pot until simmering, add saffron and set
            aside for 10 minutes.
          </Typography>
          <Typography paragraph>
            Heat oil in a (14- to 16-inch) paella pan or a large, deep skillet over
            medium-high heat. Add chicken, shrimp and chorizo, and cook, stirring
            occasionally until lightly browned, 6 to 8 minutes. Transfer shrimp to a
            large plate and set aside, leaving chicken and chorizo in the pan. Add
            pimentón, bay leaves, garlic, tomatoes, onion, salt and pepper, and cook,
            stirring often until thickened and fragrant, about 10 minutes. Add
            saffron broth and remaining 4 1/2 cups chicken broth; bring to a boil.
          </Typography>
          <Typography paragraph>
            Add rice and stir very gently to distribute. Top with artichokes and
            peppers, and cook without stirring, until most of the liquid is absorbed,
            15 to 18 minutes. Reduce heat to medium-low, add reserved shrimp and
            mussels, tucking them down into the rice, and cook again without
            stirring, until mussels have opened and rice is just tender, 5 to 7
            minutes more. (Discard any mussels that don’t open.)
          </Typography>
          <Typography>
            Set aside off of the heat to let rest for 10 minutes, and then serve.
          </Typography>
        </CardContent> */}
      </Collapse>
    </Card>
  );
}
