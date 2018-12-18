import axios from 'axios';

// GET ARME
export function getTeams() {
    return function(dispatch) {
        axios.get('/teams')
        .then(function(response) {
            dispatch({type:"GET_TEAMS", payload:response.data})
        })
        .catch(function(err) {
            dispatch({type:"GET_TEAMS_REJECTED", payload:err})
        })
    }
}
