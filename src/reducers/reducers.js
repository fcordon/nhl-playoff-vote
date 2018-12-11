import { combineReducers } from 'redux';
import { TeamsReducer } from './TeamsReducer'

export default combineReducers({
    teams: TeamsReducer
})
