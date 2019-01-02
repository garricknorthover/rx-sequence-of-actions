## Rx sequence of actions


These epics are triggered by the user typing into a field.
The SET_TODO triggers an action to update the message the user sees and an action called NOT
```javascript
import { concatMap, debounce, delay, mapTo } from 'rxjs/operators'
import { combineEpics, ofType } from 'redux-observable'
import { of, timer } from 'rxjs'

const enteringTextEpic = action$ =>
  action$.pipe(
    ofType('SET_TODO'),
    delay(200),
    concatMap(action =>
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
    concatMap(action =>
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

```