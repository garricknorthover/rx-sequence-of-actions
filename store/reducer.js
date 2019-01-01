import { SET_TODO, SET_MESSAGE } from './actionTypes'
import { combineReducers } from 'redux'

export function formData (state = { todo: '' }, action) {
  switch (action && action.type) {
    case SET_TODO:
      return { ...state, todo: action.todo }
    default:
      return state
  }
}
export function message (state = { message: '' }, action) {
  switch (action && action.type) {
    case SET_MESSAGE:
      return { ...state, text: action.text }
    default:
      return state
  }
}

const reducer = combineReducers({
  formData,
  message
})

export default reducer
