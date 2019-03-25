const initialeState = {
  schedule: []
}

export const ScheduleReducer = (state=initialeState, action) => {
  switch (action.type) {
    case 'GET_SCHEDULE':
      return {...state, schedule:[...action.payload]};
    case "GET_SCHEDULE_REJECTED":
      return action.payload
    default: {
      return state
    }
  }
}
