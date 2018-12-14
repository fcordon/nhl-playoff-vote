import { combineReducers } from 'redux'
import { TeamsReducer } from './TeamsReducer'
import { authReducer } from './AuthReducer';

export default combineReducers({
    teams: TeamsReducer,
    auth: authReducer
})
