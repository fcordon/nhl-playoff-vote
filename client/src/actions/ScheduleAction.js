import axios from 'axios';

let today = new Date()
let dd = String(today.getDate()).padStart(2, '0')
let mm = String(today.getMonth() + 1).padStart(2, '0')
let yyyy = today.getFullYear()

today = yyyy+'-'+mm+'-'+dd

// GET ARME
export function getSchedule() {
  return function(dispatch) {
    axios.get('https://statsapi.web.nhl.com/api/v1/schedule?startDate='+today+'&endDate=2019-04-06')
    .then(function(response) {
      dispatch({type:"GET_SCHEDULE", payload:response.data.dates})
    })
    .catch(function(err) {
      dispatch({type:"GET_SCHEDULE_REJECTED", payload:err})
    })
  }
}
