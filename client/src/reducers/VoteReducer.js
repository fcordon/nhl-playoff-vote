const initialeState = {
    vote: []
}

export const VoteReducer = (state=initialeState, action) => {
    switch (action.type) {
        case 'POST_VOTE':
            return {...state, vote:[...state.vote, action.payload]}
        case "POST_VOTE_REJECTED":
            return action.payload
        default: {
            return state
        }
    }
}
