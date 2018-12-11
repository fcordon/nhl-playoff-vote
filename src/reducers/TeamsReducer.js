const initialeState = {
    fetching: false,
    fetched: false,
    teams: [],
    error: null
}

export const TeamsReducer = (state=initialeState, action) => {
    switch (action.type) {
        case 'FETCH_TEAMS_PENDING': {
            return {...state, fetching: true}
        }
        case 'FETCH_TEAMS_REJECTED': {
            return {...state, fetching: false, error: action.payload}
        }
        case 'FETCH_TEAMS_FULFILLED': {
            return {...state, fetching: false, fetched: true, teams: action.payload}
        }
        default: {
            return state
        }
    }
}
