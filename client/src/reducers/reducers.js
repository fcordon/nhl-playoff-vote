import { combineReducers } from 'redux'
import { TeamsReducer } from './TeamsReducer'
import { VoteReducer } from './VoteReducer'
import { ClassementReducer } from './ClassementReducer'
import { authReducer } from './AuthReducer'
import { errorReducer } from './ErrorReducer'
import { ScheduleReducer } from './ScheduleReducer'

export default combineReducers({
  teams: TeamsReducer,
  vote: VoteReducer,
  classement: ClassementReducer,
  errors: errorReducer,
  auth: authReducer,
  schedule: ScheduleReducer
})
