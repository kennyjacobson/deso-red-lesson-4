import DesoApi from '../Deso/desoApi'

const desoApi = new DesoApi()

const BuildCommentTree = async (rootPost) => {
    const initial_comments = rootPost.PostFound.Comments
    // console.log("initial_comments", initial_comments)
    const all_comments = addComments({},initial_comments)
    return all_comments
}

const addComments = async (root, comments) => {
    if(!comments) return root
    
    root.children = []
    for(const comment of comments){
        const new_child = {}
        new_child.id = comment.PostHashHex
        new_child.posterPublicKeyBase58Check = comment.PosterPublicKeyBase58Check
        new_child.username = comment.ProfileEntryResponse.Username
        new_child.body = comment.Body
        new_child.coinPrice = comment.CoinPriceDeSoNanos
        new_child.postAge = comment.TimestampNanos
        new_child.likeCount = comment.LikeCount
        new_child.diamondCount = comment.DiamondCount
        new_child.commentCount = comment.CommentCount
        root.children.push(new_child)


        const new_child_comments = await getNewComment(comment.PostHashHex)
        addComments(new_child, new_child_comments)
    }
    return root
}

const getNewComment = async (PostHashHex) => {
    const returnedPostData = await desoApi.getSinglePost(PostHashHex)
    const comments = returnedPostData.PostFound.Comments
    console.log("comments", comments)
    return comments
}

export default BuildCommentTree