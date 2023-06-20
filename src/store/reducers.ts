import { combineReducers } from 'redux'

// Reducers
import appReducer from './App/reducers'

// Combine Reducers
export const rootReducer = combineReducers({
  app: appReducer,
})
