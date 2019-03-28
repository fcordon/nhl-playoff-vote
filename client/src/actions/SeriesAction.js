import axios from 'axios';

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

export function postSeries(vote) {
  return function(dispatch) {
    axios.post('/voteseries', vote)
    .then(function(response) {
      dispatch({type:"POST_SERIES", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"POST_SERIES_REJECTED", payload:err})
    })
  }
}
