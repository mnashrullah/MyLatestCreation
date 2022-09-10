import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'
import { filter } from 'ramda'
import { startsWith } from 'ramdasauce'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  pokemonRequest: null,
  pokemonSuccess: ['data'],
  pokemonFailure: ['message'],

  pokemonDetailRequest: {name: null},
  pokemonDetailSuccess: ['data'],
  pokemonDetailFailure: ['message'],

})

export const PokemonTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  pokemonResponse: null,
  pokemonError: '',

  pokemonDetailResponse: null,
  pokemonDetailError: '',
})

/* ------------- Reducers ------------- */

export const pokemonSuccess = (state, { data }) => {
  return state.merge({ pokemonResponse: data})
}
export const pokemonFailure = (state, { message }) => {
  return state.merge({ pokemonError: message})
}

export const pokemonDetailSuccess = (state, { data }) => {
  return state.merge({ pokemonDetailResponse: data})
}
export const pokemonDetailFailure = (state, { message }) => {
  return state.merge({ pokemonDetilError: message})
}
/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.POKEMON_SUCCESS]: pokemonSuccess,
  [Types.POKEMON_FAILURE]: pokemonFailure,

  [Types.POKEMON_DETAIL_SUCCESS]: pokemonDetailSuccess,
  [Types.POKEMON_DETAIL_FAILURE]: pokemonDetailFailure,

})
