import { SET_TODO, SET_MESSAGE } from './actionTypes'

export const setTodo = todo => ({
  type: SET_TODO,
  todo
})

export const setMessage = text => ({
  type: SET_MESSAGE,
  text
})