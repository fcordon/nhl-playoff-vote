const initialeState = {
  vote: [],
  userVote: [],
  allVote: []
}

export const VoteReducer = (state=initialeState, action) => {
  switch (action.type) {
    case 'POST_VOTE':
      return {...state, vote:[...state.vote, action.payload]}
    case "POST_VOTE_REJECTED":
      return action.payload
    case 'GET_VOTE':
      return {...state, userVote:[...action.payload]};
    case "GET_VOTE_REJECTED":
      return action.payload
    case 'GET_ALL_VOTE':
      return {...state, allVote:[...action.payload]};
    case "GET_ALL_VOTE_REJECTED":
      return action.payload
    default: {
      return state
    }
  }
}
