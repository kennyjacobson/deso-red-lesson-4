import React, { useEffect, useState } from 'react'
import {  Grid, Skeleton, Stack } from '@mui/material'
import UserCard from '../Components/userCard'
import PostCard from '../Components/postCard'
import DesoApi from '../Deso/desoApi'
import { useParams } from 'react-router'


const user = {
    Profile:{
        Username : "@Hi",
        Description : "stuff",

        PublicKeyBase58Check : 'BC1YLiLNcDhfCPdea31wwNwDBqnokUHdSeCqL6KxsRN6NSJ3S5AXc1T',
    }
    
}

const posts ={ Posts : [
    {
        Body : "ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
        ImageURLs:[],
    },
]
}


function Main(props) {
    const [userData, setUserData] = useState(user)
    const [userPosts, setUserPosts] = useState(posts)
    const [waitingUser, setWaitingUser] = useState(false)
    const [waitingPosts, setWaitingPosts] = useState(false)
    //const [user, setUser ] = useState("KennyJ")
    const { id } = useParams()
    let thisUser = "kennyj"
    if(id){
        thisUser = id
    }
    
    useEffect(() => {
        props.setSearchFunction(() => searchForUser);
        fetchUser(thisUser)
        fetchUserPosts(thisUser)
    }, []) // eslint-disable-line react-hooks/exhaustive-deps

    function searchForUser(searchValue) {
        //alert(searchValue)

        if(searchValue){
            thisUser = searchValue
        }
        
        //alert(thisUser)
        fetchUser(searchValue)
        fetchUserPosts(searchValue)
    }

    const fetchUser = async (username) => {
        setWaitingUser(true)
        const desoApi = new DesoApi()
        const returnedUserData = await desoApi.getSingleProfile(null, username)
        if(!returnedUserData) return
        setUserData(returnedUserData)
        setWaitingUser(false)
    }

    const fetchUserPosts = async (username) => {
        setWaitingPosts(true)
        const desoApi = new DesoApi()
        const returnedUserPostData = await desoApi.getPostsForPublicKey(username, "")
        if(!returnedUserPostData) return
        if(!returnedUserPostData.Posts) {
            returnedUserPostData.Posts = []
        }
        setUserPosts(returnedUserPostData)
        setWaitingPosts(false)
    }

    return (
        <>
        <Grid container alignItems="center" spacing={2}>

            <Grid item xs={0} md={3}> </Grid>    
            <Grid item xs={12} md={6} >
                {
                (waitingUser) ? (
                    <Stack spacing={1}>
                        <Skeleton variant="text" />
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={118} />
                    </Stack>

                ) : (
                    <UserCard 
                        username={userData.Profile?.Username} 
                        userBio={userData.Profile?.Description}  
                        PublicKeyBase58Check={userData.Profile?.PublicKeyBase58Check}
                    ></UserCard>
                )
                }
            </Grid>
            <Grid item xs={0} md={3}></Grid>

            {
                (waitingPosts) ? (
                    <>
                    <Grid item xs={0} md={3}> </Grid>    
                    <Grid item xs={12} md={6} >
                    <Stack spacing={1}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={118} />
                    </Stack>
                    </Grid>
                    <Grid item xs={0} md={3}></Grid>
                    <Grid item xs={0} md={3}> </Grid>    
                    <Grid item xs={12} md={6} >
                    <Stack spacing={1}>
                        <Skeleton variant="circular" width={40} height={40} />
                        <Skeleton variant="rectangular" width={210} height={118} />
                    </Stack>
                    </Grid>
                    <Grid item xs={0} md={3}></Grid>

                    </>

                ) :
               
                userPosts.Posts.map((post) => (
                    <>
                    <Grid item xs={0} md={3}> </Grid>    
                    <Grid item xs={12} md={6} >


                        <PostCard 
                            ImageURLs={post.ImageURLs} 
                            postText={post.Body} 
                            username={post.username} 
                            coinPrice={post.coinPrice}  
                            avatarSrc={post.avatarSrc} 
                            PostHashHex={post.PostHashHex} 
                            likeCount={post.LikeCount} 
                            diamondCount={post.DiamondCount} 
                            commentCount={post.CommentCount} 
                        ></PostCard>



                    </Grid>
                    <Grid item xs={0} md={3}></Grid>

                    </>
                    
                )) 
            }
            
        </Grid>
        </>
    )
}

export default Main