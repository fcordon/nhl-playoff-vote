import axios from 'axios';

// GET ARME
export function postVote(vote) {
    return function(dispatch) {
        axios.post('/vote', vote)
        .then(function(response) {
            dispatch({type:"POST_VOTE", payload:response.data})
        })
        .catch(function(err) {
            dispatch({type:"POST_VOTE_REJECTED", payload:err})
        })
    }
}
