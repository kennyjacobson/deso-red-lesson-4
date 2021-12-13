import React, { useEffect, useState } from 'react'
import {  Grid,   Typography } from '@mui/material'
import { useParams } from "react-router-dom"
import PostCard from '../Components/postCard'
import CommentTree from '../Components/commentTree'
import DesoApi from '../Deso/desoApi'
import BuildCommentTree from '../Deso/buildCommentTree'
import { AssuredWorkload } from '@mui/icons-material'

const initialPostData = {
    PostFound: {
        PostHashHex: "",
        ImageURLs:[],
        ProfileEntryResponse: {
            PublicKeyBase58Check: "BC1YLiLNcDhfCPdea31wwNwDBqnokUHdSeCqL6KxsRN6NSJ3S5AXc1T",
            Username: "KennyJ",
            CoinPriceDeSoNanos: 1086798890,
        }
    }
}

const initialTreeData = { children : [{
    id: 'root',
    username: 'Lorem',
    body: 'Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
    coinPrice: '$125.00',
    avatarSrc: '/logo512.png',
    postAge: '30 mins ago',
    children: [
      {
        id: '1',
        username: 'Lorem',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        coinPrice: '$125.00',
        postAge: '20 mins ago',
      },
      {
        id: '3',
        username: 'Lorem',
        body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        coinPrice: '$125.00',
        children: [
          {
            id: '4',
            username: 'Lorem',
          },
        ],
      },
    ],
  },

]
}

// const initialTreeData = { children : [{
//     id: 'root',
//     username: 'Lorem',
//     body: 'Lorem dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//     coinPrice: '$125.00',
//     avatarSrc: '/logo512.png',
//     postAge: '30 mins ago',
//     children: [
//       {
//         id: '1',
//         username: 'MelanieJ',
//         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         coinPrice: '$125.00',
//         postAge: '20 mins ago',
//       },
//       {
//         id: '3',
//         username: 'KennyJTest',
//         body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
//         coinPrice: '$125.00',
//         children: [
//           {
//             id: '4',
//             username: 'Child - 4',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 'root2',
//     username: 'Hi, i am another tl comment',
//     coinPrice: '$125.00',
//     children: [
//       {
//         id: '11',
//         username: 'Child - 11',
//         avatarSrc: '/logo512.png',
//       },
//       {
//         id: '13',
//         username: 'Child - 13',
//         children: [
//           {
//             id: '14',
//             username: 'Child - 14',
//           },
//         ],
//       },
//     ],
//   }
// ]
// }

function PostComments(props) {
    const [postData, setPostData] = useState(initialPostData)
    const [treeData, setTreeData] = useState(initialTreeData)
    const { id } = useParams()
    useEffect(() => {
        fetchPost()
    }, []) 

    const fetchPost = async () => {
        const desoApi = new DesoApi()

        const returnedPostData = await desoApi.getSinglePost(id)
        console.log(returnedPostData)
        setPostData(returnedPostData)

        const returnedTreeData = await BuildCommentTree(returnedPostData)
        console.log("returnedTreeData", returnedTreeData)
        setTreeData(returnedTreeData)
    }

    return (
        <>
        <Grid container alignItems="center" spacing={1}>

            <Grid item xs={0} md={2}> </Grid>    
            <Grid item xs={12} md={8} >
            <PostCard 
                hideUserInfo={false} 
                PublicKeyBase58Check={postData.PostFound.PosterPublicKeyBase58Check}  
                ImageURLs={postData.PostFound.ImageURLs} 
                postText={postData.PostFound.Body} 
                username={postData.PostFound.ProfileEntryResponse.Username} 
                coinPrice={postData.PostFound.ProfileEntryResponse.CoinPriceDeSoNanos}   
                PostHashHex={postData.PostFound.PostHashHex} 
                likeCount={postData.PostFound.LikeCount} 
                diamondCount={postData.PostFound.DiamondCount} 
                commentCount={postData.PostFound.CommentCount} 
            ></PostCard>
            </Grid>
            <Grid item xs={0} md={2}></Grid>

            <Grid item xs={0} md={2}> </Grid>    
            <Grid item xs={12} md={8} >
                <CommentTree treeData={treeData}></CommentTree>
            </Grid>
            <Grid item xs={0} md={2}></Grid>


        </Grid>
        </>
    )
}

export default PostComments