import axios from 'axios';

// POST VOTE
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

// GET VOTE BY USER
export function getVote(id) {
  return function(dispatch) {
    axios.get('/vote/' + id)
    .then(function(response) {
      dispatch({type:"GET_VOTE", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"GET_VOTE_REJECTED", payload:err})
    })
  }
}

// GET ALL VOTE
export function getAllVote() {
  return function(dispatch) {
    axios.get('/vote')
    .then(function(response) {
      dispatch({type:"GET_ALL_VOTE", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"GET_ALL_VOTE_REJECTED", payload:err})
    })
  }
}
