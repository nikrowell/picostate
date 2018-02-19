export default function createStore (initialState) {
  let tick
  let state = initialState
  let handlers = []

  return {
    get state () {
      return state
    },
    hydrate (fn) {
      state = Object.assign({}, state, typeof fn === 'function' ? fn(state) : fn)
      return function (done) {
        tick && clearTimeout(tick)
        tick = setTimeout(() => {
          for (let fn of handlers) fn(state)
          done && done()
        }, 16.67)
      }
    },
    listen (fn) {
      handlers.indexOf(fn) < 0 && handlers.push(fn)
      return () => handlers.splice(handlers.indexOf(fn), 1)
    },
    reset () {
      state = initialState
      handlers = []
    }
  }
}
