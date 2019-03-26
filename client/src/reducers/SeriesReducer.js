const initialeState = {
  series: [],
  error: null
}

export const SeriesReducer = (state=initialeState, action) => {
  switch (action.type) {
    case 'GET_SERIES':
      return {...state, series:[...action.payload]};
    case "GET_SERIES_REJECTED":
      return action.payload
    default: {
      return state
    }
  }
}
