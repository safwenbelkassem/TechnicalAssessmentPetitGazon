import { createReducer } from '@reduxjs/toolkit'
import {
  GET_LIST_OF_CLUB_ACTION,
  GET_LIST_OF_CLUB_FAIL,
  GET_LIST_OF_CLUB_SUCCES,
  GET_LIST_OF_PLAYERS_ACTION,
  GET_LIST_OF_PLAYERS_FAIL,
  GET_LIST_OF_PLAYERS_SUCCES,
} from './constants'

const initialState = {
  clubLoading: true,
  playersLoading: true,
  clubs: [],
  players: [],
  error: null,

}

const appReducer = createReducer(initialState, builder => {


  builder
    .addCase(GET_LIST_OF_CLUB_ACTION, (state, action) => {
      state.clubLoading = true
    })
    .addCase(GET_LIST_OF_CLUB_SUCCES, (state, action: any) => {
      state.clubLoading = false
      state.clubs = action.payload
    })
    .addCase(GET_LIST_OF_CLUB_FAIL, (state, action: any) => {
      state.clubLoading = false
      state.clubs = []
      state.error = action.payload.message
    })
    .addCase(GET_LIST_OF_PLAYERS_ACTION, (state, action) => {
      state.playersLoading = true
    })
    .addCase(GET_LIST_OF_PLAYERS_SUCCES, (state, action: any) => {
      state.playersLoading = false
      state.players = action.payload
    })
    .addCase(GET_LIST_OF_PLAYERS_FAIL, (state, action: any) => {
      state.playersLoading = false
      state.players = []
      state.error = action.payload.message
    })
})

export default appReducer
