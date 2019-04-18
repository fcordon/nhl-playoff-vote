const initialeState = {
  series: [],
  nhlSeries: [],
  voteSeries: [],
  userSeries: [],
  allUserSeries: [],
  error: null
}

export const SeriesReducer = (state=initialeState, action) => {
  switch (action.type) {
    case 'GET_SERIES':
      return {...state, series:[...action.payload]};
    case "GET_SERIES_REJECTED":
      return action.payload

    case 'POST_NHL_SERIES':
      return {...state, nhlSeries:[...action.payload]}
    case "POST_NHL_SERIES_REJECTED":
      return action.payload

    case "UPDATE_SERIES":
      const newArray = [...state.series]
      const newItem = action.datas
      newArray[newArray.findIndex(item => item._id === action.id)] = newItem
      return {
        ...state,
        series:newArray
      };
    case "UPDATE_SERIES_REJECTED":
      return action.payload

    case 'POST_SERIES':
      return {...state, voteSeries:[...action.payload]}
    case "POST_SERIES_REJECTED":
      return action.payload

    case 'GET_USER_SERIES_VOTE':
      return {...state, userSeries:[...action.payload]}
    case "GET_USER_SERIES_VOTE_REJECTED":
      return action.payload

    case 'GET_ALL_USER_SERIES_VOTE':
      return {...state, allUserSeries:[...action.payload]}
    case "GET_ALL_USER_SERIES_VOTE_REJECTED":
      return action.payload

    default: {
      return state
    }
  }
}
