import axios from 'axios';

// POST CLASSEMENT
export function postClassement(classement) {
  return function(dispatch) {
    axios.post('/classement', classement)
    .then(function(response) {
      dispatch({type:"POST_CLASSEMENT", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"POST_CLASSEMENT_REJECTED", payload:err})
    })
  }
}

// GET CLASSEMENT BY USER
export function getClassement(id) {
  return function(dispatch) {
    axios.get('/classement/' + id)
    .then(function(response) {
      dispatch({type:"GET_CLASSEMENT", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"GET_CLASSEMENT_REJECTED", payload:err})
    })
  }
}

// GET ALL CLASSEMENT
export function getAllClassement() {
  return function(dispatch) {
    axios.get('/classement')
    .then(function(response) {
      dispatch({type:"GET_ALL_CLASSEMENT", payload:response.data})
    })
    .catch(function(err) {
      dispatch({type:"GET_ALL_CLASSEMENT_REJECTED", payload:err})
    })
  }
}

// UPDATE CLASSEMENT BY USER
export function updateClassement(id, newData) {
  return function(dispatch) {
    axios.put('/classement/' + id, newData)
    .then(function(response) {
      dispatch({type:"UPDATE_CLASSEMENT", payload:response.data, userID:id, datas:newData})
    })
    .catch(function(err) {
      dispatch({type:"UPDATE_CLASSEMENT_REJECTED", payload:err})
    })
  }
}
