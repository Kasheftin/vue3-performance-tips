export const state = () => ({
  regularItems: [],
  frozenItems: []
})

export const mutations = {
  setRegularItems (state, items) {
    state.regularItems = items
  },
  addRegularItems (state, items) {
    state.regularItems = [...state.regularItems, ...items]
  },
  setFrozenItems (state, items) {
    state.frozenItems = items.map(Object.freeze)
  },
  addFrozenItems (state, items) {
    state.frozenItems = [...state.frozenItems, ...items.map(Object.freeze)]
  }
}
