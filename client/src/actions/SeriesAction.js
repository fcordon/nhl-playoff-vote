import axios from 'axios';

// GET ARME
export function getSeries() {
  return function(dispatch) {
    axios.get('/series')
    .then(function(response) {
      dispatch({type:"GET_SERIES", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"GET_SERIES_REJECTED", payload:err})
    })
  }
}
