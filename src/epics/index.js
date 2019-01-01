import { mergeMap, debounce, delay, mapTo } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { of, timer } from 'rxjs'

const enteringTextEpic = action$ =>
  action$.pipe(
    ofType('SET_TODO'),
    delay(200),
    mergeMap(action =>
      of(
        { type: 'SET_MESSAGE', text: 'You are entering text' },
        { type: 'NOT' }
      )
    )
  )

const notEnteringTextEpic = action$ =>
  action$.pipe(
    ofType('NOT'),
    debounce(() => timer(1000)),
    mergeMap(action =>
      of(
        { type: 'SET_MESSAGE', text: 'Now you are not entering text' },
        { type: 'FINISHED' }
      )
    )
  )
/**The actions NOT and FINISHED are dummy actions and are not in the reducer */
const finishedEnteringTextEpic = action$ =>
  action$.pipe(
    ofType('FINISHED'),
    debounce(() => timer(2000)),
    mapTo({ type: 'SET_MESSAGE', text: '' })
  )

const epica = combineEpics(
  enteringTextEpic,
  finishedEnteringTextEpic,
  notEnteringTextEpic
)

export default epica
