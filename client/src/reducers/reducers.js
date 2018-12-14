import { combineReducers } from 'redux'
import { TeamsReducer } from './TeamsReducer'
import { authReducer } from './AuthReducer'
import { errorReducer } from './ErrorReducer'

export default combineReducers({
    teams: TeamsReducer,
    errors: errorReducer,
    auth: authReducer
})
