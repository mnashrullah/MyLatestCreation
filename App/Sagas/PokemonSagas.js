import { call, put } from 'redux-saga/effects'
import { path } from 'ramda'
import PokemonActions from '../Redux/PokemonRedux'

export function * getPokemon (api, action) {
  const response = yield call(api.getPokemon)
  console.log(response)
  if (response.ok) {
    const data = path(['data','results'], response)
    yield put(PokemonActions.pokemonSuccess(data))
  } else {
    const message = path(['data'], response)
    yield put(PokemonActions.pokemonFailure(message))
  }
}


export function * getPokemonDetail (api, action) {
  let name = action.name
  const response = yield call(api.getPokemon, name)
  console.log('getPokemonDetail', response)
  if (response.ok) {
    const data = path(['data','results'], response)
    yield put(PokemonActions.pokemonDetailSuccess(data))
  } else {
    const message = path(['data'], response)
    yield put(PokemonActions.pokemonDetailFailure(message))
  }
}
