export const state = () => ({
  items: []
})

export const getters = {
  itemById: (state) => (itemId) => {
    console.count('itemById')
    return state.items.find(item => item.id === itemId)
  },
  itemsByIds: (state) => {
    console.count('itemsByIds')
    return state.items.reduce((out, item) => {
      out[item.id] = item
      return out
    }, {})
  }
}

export const mutations = {
  setItems (state, items) {
    state.items = items
  }
}

export const actions = {
  initializeItems ({ commit }, itemsCount = 10) {
    const items = []
    for (let i = 0; i < itemsCount; i++) {
      items.push({
        id: i + 1,
        title: `Item ${i + 1}`
      })
    }
    commit('setItems', items)
  }
}
