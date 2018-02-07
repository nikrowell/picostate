export default function createStore (initialState) {
  let state = initialState
  const handlers = []

  return {
    get state () {
      return state
    },
    hydrate (fn) {
      state = Object.assign({}, state, typeof fn === 'function' ? fn(state) : fn)
      return function () {
        for (let fn of handlers) fn(state)
      }
    },
    listen (fn) {
      handlers.push(fn)
      return () => handlers.slice(handlers.indexOf(fn), 1)
    },
    reset () {
      state = initialState
    }
  }
}
