import axios from 'axios';

// GET ARME
export function getTeams() {
    return function(dispatch) {
        axios.get('https://statsapi.web.nhl.com/api/v1/teams')
        .then(function(response) {
            console.log('response : ', response.data.teams)
            dispatch({type:"FETCH_TEAMS_FULFILLED", payload:response.data.teams})
        })
        .catch(function(err) {
            dispatch({type:"FETCH_TEAMS_ERROR", payload:err})
        })
    }
}
