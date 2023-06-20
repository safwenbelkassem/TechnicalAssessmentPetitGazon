import { AnyAction, createAction, createAsyncThunk } from '@reduxjs/toolkit'
import { GET_LIST_OF_CLUB, GET_LIST_OF_CLUB_ACTION, GET_LIST_OF_CLUB_FAIL, GET_LIST_OF_CLUB_SUCCES, GET_LIST_OF_PLAYERS, GET_LIST_OF_PLAYERS_ACTION, GET_LIST_OF_PLAYERS_FAIL, GET_LIST_OF_PLAYERS_SUCCES, GET_LIST_OF_PLAYER_BY_ID, GET_LIST_OF_PLAYER_BY_ID_ACTION } from './constants'

//GET LIST OF Clubs ACTION
export const getListOfClubAction: any = createAsyncThunk(
  GET_LIST_OF_CLUB_ACTION,
  async (res: any, { dispatch }) => {
    await dispatch(getListOfClub())
      .then(async (result: any) => {

        if (result.error) {

          dispatch(getListClubFail(result.error))
          res.onFailure(result.error.response)
          return
        }

        const response = Object.values(result.result.data.championshipClubs);

        dispatch(getListClubSucces(response))
        res.onSuccess(response)
      })
      .catch((err: any) => {

        res.onFailure(err)
      })
  },
)
export const getListOfClub: Function = createAction(
  GET_LIST_OF_CLUB,
  function prepare() {
    return {
      payload: {
        url: `/data/championship-clubs`,
        method: 'GET',
      },
    }
  },
)
export const getListClubSucces: Function = createAction(
  GET_LIST_OF_CLUB_SUCCES,
  function prepare(data) {

    return {
      payload: data,
    }
  },
)
export const getListClubFail: Function = createAction(
  GET_LIST_OF_CLUB_FAIL,
  function prepare(data) {

    return {
      payload: data,
    }
  },
)


//GET LIST OF Players ACTION
export const getListOfPlayersAction: any = createAsyncThunk(
  GET_LIST_OF_PLAYERS_ACTION,
  async (res: any, { dispatch }) => {
    await dispatch(getListOfPlayers())
      .then(async (result: any) => {

        if (result.error) {

          dispatch(getListPlayersFail(result.error))
          res.onFailure(result.error.response)
          return
        }
        const response: PoolPlayersResponse = result?.result?.data?.poolPlayers

        dispatch(getListPlayersSucces(response))
        res.onSuccess(response)
      })
      .catch((err: any) => {

        res.onFailure(err)
      })
  },
)
export const getListOfPlayers: Function = createAction(
  GET_LIST_OF_PLAYERS,
  function prepare() {
    return {
      payload: {
        url: `/data/championship-players-pool/1`,
        method: 'GET',
      },
    }
  },
)
export const getListPlayersSucces: Function = createAction(
  GET_LIST_OF_PLAYERS_SUCCES,
  function prepare(data) {

    return {
      payload: data,
    }
  },
)
export const getListPlayersFail: Function = createAction(
  GET_LIST_OF_PLAYERS_FAIL,
  function prepare(data) {

    return {
      payload: data,
    }
  },
)

//GET LIST OF Player by ID ACTION
export const getPlayerByIdAction: any = createAsyncThunk(
  GET_LIST_OF_PLAYER_BY_ID_ACTION,
  async (res: any, { dispatch }) => {

    await dispatch(getPlayerById(res.playerId))
      .then(async (result: any) => {

        if (result.error) {


          res.onFailure(result.error.response)
          return
        }
        const response = result.result.data


        res.onSuccess(response)
      })
      .catch((err: any) => {

        res.onFailure(err)
      })
  },
)

export const getPlayerById: Function = createAction(
  GET_LIST_OF_PLAYER_BY_ID,
  function prepare(data) {
    return {
      payload: {
        url: `/data/championship-player-stats/${data}/2022`,
        method: 'GET',
      },
    }
  },
)





export interface Championship {
  jerseys: {
    [year: string]: string;
  };
  active: boolean;
}

export interface ChampionshipClub {
  [championshipId: string]: Championship | {};
}

export interface Name {
  'fr-FR': string;
  'en-GB': string;
  'es-ES': string;
}

export interface ChampionshipClubs {
  championshipClubs: {
    [clubId: string]: {
      championships: ChampionshipClub;
      id: string;
      name: Name;
      shortName: string;
      defaultJerseyUrl: string;
      defaultAssets: null;
    };
  };
}



export interface PoolPlayer {
  id: string;
  firstName: string;
  lastName: string;
  position: number;
  ultraPosition: number;
  quotation: number;
  clubId: string;
  stats: {
    averageRating: number;
    totalGoals: number;
    totalMatches: number;
    totalStartedMatches: number;
    totalPlayedMatches: number;
  };
}

export interface PoolPlayersResponse {
  poolPlayers: PoolPlayer[];
}

export interface Match {
  playerClubId: string;
  matchId: string;
  gameWeekNumber: number;
  date: string;
  home: {
    clubId: string;
    score: number;
  };
  away: {
    clubId: string;
    score: number;
  };
  playerPerformance: {
    status: number;
    rating?: number;
    goals?: number;
    ownGoals?: number;
    minutesPlayed?: number;
  };
}

export interface ChampionshipPlayerDetails {
  mpg_championship_club_152: object;
  clubs: object;
  total: {
    matches?: Match[];
    quotations: {
      quotation: number;
      date: string;
    }[];
    stats: {
      totalPlayedMatches: number;
      totalStartedMatches: number;
      totalGoals: number;
      totalOwnGoals: number;
      totalYellowCard: number;
      totalRedCard: number;
      totalPenaltiesMissed: number;
      totalPenaltiesSaved: number;
      totalAssists: number;
      totalCleanSheets: number;
      totalManOfTheMatch: number;
    };
  };
}

export interface PlayerStats {
  id: string;
  type: string;
  championships: {
    [key: string]: ChampionshipPlayerDetails;
  };
  position: number;
  ultraPosition: number;
}
