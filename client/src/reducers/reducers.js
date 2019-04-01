import { combineReducers } from 'redux'
import { TeamsReducer } from './TeamsReducer'
import { SeriesReducer } from './SeriesReducer'
import { VoteReducer } from './VoteReducer'
import { ClassementReducer } from './ClassementReducer'
import { authReducer } from './AuthReducer'
import { errorReducer } from './ErrorReducer'
import { ScheduleReducer } from './ScheduleReducer'

export default combineReducers({
  teams: TeamsReducer,
  series: SeriesReducer,
  vote: VoteReducer,
  classement: ClassementReducer,
  errors: errorReducer,
  auth: authReducer,
  schedule: ScheduleReducer
})
