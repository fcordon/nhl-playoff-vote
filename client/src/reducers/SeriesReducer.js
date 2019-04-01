const initialeState = {
  series: [],
  voteSeries: [],
  userSeries: [],
  error: null
}

export const SeriesReducer = (state=initialeState, action) => {
  switch (action.type) {
    case 'GET_SERIES':
      return {...state, series:[...action.payload]};
    case "GET_SERIES_REJECTED":
      return action.payload
    case 'POST_SERIES':
      return {...state, voteSeries:[...action.payload]}
    case "POST_SERIES_REJECTED":
      return action.payload
    case 'GET_USER_SERIES_VOTE':
      return {...state, userSeries:[...action.payload]}
    case "GET_USER_SERIES_VOTE_REJECTED":
      return action.payload
    default: {
      return state
    }
  }
}