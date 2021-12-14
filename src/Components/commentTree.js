import * as React from 'react';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TreeItem, { treeItemClasses } from '@mui/lab/TreeItem';
import { Avatar, Card, CardContent, IconButton, Typography } from '@mui/material';
import { Box, styled } from '@mui/system';
import DiamondIcon from '@mui/icons-material/Diamond';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ModeCommentIcon from '@mui/icons-material/ModeComment';




// const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
//     color: "#892284",

// }))


const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
    color: theme.palette.text.secondary,
    [`& .${treeItemClasses.content}`]: {
      color: theme.palette.text.secondary,
      borderTopRightRadius: theme.spacing(2),
      borderBottomRightRadius: theme.spacing(2),
      paddingRight: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      '&.Mui-expanded': {
        fontWeight: theme.typography.fontWeightRegular,
      },
      '&:hover': {
        backgroundColor: theme.palette.action.hover,
      },
      '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
        backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
        color: 'var(--tree-view-color)',
      },
      [`& .${treeItemClasses.label}`]: {
        fontWeight: 'inherit',
        color: 'inherit',
      },
    },
    [`& .${treeItemClasses.group}`]: {
      marginLeft: theme.spacing(2),
      [`& .${treeItemClasses.content}`]: {
        paddingLeft: theme.spacing(2),
        
      },
    },
}))

function convertToTime(timestamp){
  var date = new Date(timestamp/1000000)
  return date.getDate()+
  "/"+(date.getMonth()+1)+
  "/"+date.getFullYear()+
  " "+date.getHours()+
  ":"+date.getMinutes()+
  ":"+date.getSeconds()
}

function StyledTreeItem(props) {
    const {
      bgColor,
      color,
      coinPrice,
      userName,
      body,
      postAge,
      posterPublicKeyBase58Check,
      likeCount, 
      diamondCount, 
      commentCount,
      ...other
    } = props;
  
    console.log("props", props)
    const avatarUrl = `https://diamondapp.com/api/v0/get-single-profile-picture/${posterPublicKeyBase58Check}?fallback=https://diamondapp.com/assets/img/default_profile_pic.png`
    return (
      <StyledTreeItemRoot
        label={
        <>
          <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
            <Avatar  aria-label="recipe" src={avatarUrl} sx={{ width: 24, height: 24, mr: 1 }}>
                K
            </Avatar>
            <Typography >
              {userName}
            </Typography>
            <Typography variant="caption" color="inherit" sx={{ ml: 1 }} >
              {coinPrice}
            </Typography>
            <Typography variant="caption" color="inherit" sx={{ ml: 3 }} >
              |
            </Typography>
            <Typography variant="caption" color="inherit" sx={{ ml: 3 }} >
              {convertToTime(postAge)}
            </Typography>
            
          </Box>
          <Box>
            <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1, mr: 5, mb: 2 }}>{body}</Typography>
          </Box>
          <Box sx={{ mb:1}}>
            <IconButton aria-label="likes" sx={{mr: 5}}>
              <FavoriteIcon /><Typography sx={{ml: 1}}>{likeCount}</Typography>
            </IconButton>
            <IconButton aria-label="comments" sx={{mr: 5}}>
              <ModeCommentIcon /><Typography sx={{ml: 1}}>{commentCount}</Typography>
            </IconButton>
            <IconButton aria-label="diamond" sx={{mr: 5}}>
              <DiamondIcon/><Typography sx={{ml: 1}}>{diamondCount}</Typography>
            </IconButton>
{/*             
            <IconButton aria-label="expand">
              <ExpandMoreIcon />
              </IconButton> */}
          </Box>
        </>  
        }
        style={{
          '--tree-view-color': color,
          '--tree-view-bg-color': bgColor,
        }}
        {...other}
      />
    );
  }
  
StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    coinPrice: PropTypes.string,
    userName: PropTypes.string.isRequired,
    body: PropTypes.string,
    postAge: PropTypes.string,
    posterPublicKeyBase58Check: PropTypes.string,
    likeCount: PropTypes.string, 
    diamondCount: PropTypes.string, 
    commentCount: PropTypes.string,
};

export default function CommentTree({treeData}) {
  const renderTree = (nodes) => (
    <StyledTreeItem  
        key={nodes.id} 
        nodeId={nodes.id} 
        userName={nodes.username} 
        body={nodes.body} 
        coinPrice={nodes.coinPrice} 
        postAge={nodes.postAge}
        posterPublicKeyBase58Check={nodes.posterPublicKeyBase58Check}
        likeCount={nodes.likeCount} 
        diamondCount={nodes.diamondCount} 
        commentCount={nodes.commentCount}
      >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </StyledTreeItem >
  )

  const renderTrees = (nodes) => {
        return (
            nodes.children.map((node) => renderTree(node))
        )
  }

  return (
    <Card sx={{bgcolor: (theme) => theme.palette.secondary.main}} >
        <CardContent  >
            <TreeView
            aria-label="rich object"
            defaultCollapseIcon={<ExpandMoreIcon />}
            defaultExpanded={['root']}
            defaultExpandIcon={<ChevronRightIcon />}
            sx={{  flexGrow: 1,   }}
            
            >
            {renderTrees(treeData)}
                
            </TreeView>
        </CardContent  >
    </Card>
    
  );
}
