export default function createStore (initialState) {
  let state = initialState
  let listeners = []
  let onces = []

  return {
    get state () {
      return state
    },
    hydrate (fn) {
      state = Object.assign({}, state, typeof fn === 'function' ? fn(state) : fn)
      return function (done) {
        for (let fn of listeners) fn(state)
        while (onces.length) onces.pop()(state)
        done && done()
      }
    },
    listen (fn) {
      listeners.indexOf(fn) < 0 && listeners.push(fn)
      return () => listeners.splice(listeners.indexOf(fn), 1)
    },
    once (fn) {
      onces.indexOf(fn) < 0 && onces.push(fn)
    },
    reset () {
      state = initialState
      listeners = []
    }
  }
}
