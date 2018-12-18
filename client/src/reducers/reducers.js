import { combineReducers } from 'redux'
import { TeamsReducer } from './TeamsReducer'
import { VoteReducer } from './VoteReducer'
import { authReducer } from './AuthReducer'
import { errorReducer } from './ErrorReducer'

export default combineReducers({
    teams: TeamsReducer,
    vote: VoteReducer,
    errors: errorReducer,
    auth: authReducer
})
