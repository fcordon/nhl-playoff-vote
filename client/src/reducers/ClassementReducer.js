const initialeState = {
  classement: [],
  userClassement: [],
  allClassement: []
}

export const ClassementReducer = (state=initialeState, action) => {
  switch (action.type) {
    case 'POST_CLASSEMENT':
      return {...state, classement:[...state.classement, action.payload]}
    case "POST_CLASSEMENT_REJECTED":
      return action.payload

    case 'GET_CLASSEMENT':
      return {...state, userClassement:[...action.payload]};
    case "GET_CLASSEMENT_REJECTED":
      return action.payload

    case 'GET_ALL_CLASSEMENT':
      return {...state, allClassement:[...action.payload]};
    case "GET_ALL_CLASSEMENT_REJECTED":
      return action.payload

    case "UPDATE_CLASSEMENT":
      const newArray = [...state.allClassement]
      const newItem = action.datas
      newArray[newArray.findIndex(item => item._id === action.id)] = newItem
      return {
        ...state,
        allClassement:newArray
      };
    case "UPDATE_CLASSEMENT_REJECTED":
      return action.payload
    default: {
      return state
    }
  }
}
