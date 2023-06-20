import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { http } from '../config/middelwares/http'
import { rootReducer } from './reducers'


// Init store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk, http)
})
