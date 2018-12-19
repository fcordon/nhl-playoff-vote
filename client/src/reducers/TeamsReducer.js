const initialeState = {
    teams: [],
    error: null
}

export const TeamsReducer = (state=initialeState, action) => {
    switch (action.type) {
        case 'GET_TEAMS':
            return {...state, teams:[...action.payload]};
        case "GET_TEAMS_REJECTED":
            return action.payload
        default: {
            return state
        }
    }
}
