import React from 'react'
import { connect } from 'react-redux'
import { setTodo } from './store/actions'

const App = ({ setTodo, todo, message }) => (
  <div>
    <input
      placeholder='Todo'
      onChange={event => setTodo(event.target.value)}
      value={todo}
    />

    {message}
  </div>
)

const mapDispatchToProps = {
  setTodo: setTodo
}
const mapStateToProps = state => {
  return {
    todo: state.formData.todo,
    message: state.message.text
  }
}
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
