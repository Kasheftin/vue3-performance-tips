export const state = () => ({
  items: [],
  checkedItemIds: []
})

export const getters = {
  extendedItems (state) {
    return state.items.map(item => ({
      ...item,
      isChecked: state.checkedItemIds.includes(item.id)
    }))
  },
  extendedItemsByIds (state, getters) {
    return getters.extendedItems.reduce((out, item) => {
      out[item.id] = item
      return out
    }, {})
  }
}

export const mutations = {
  setItems (state, items) {
    state.items = items
  },
  setCheckedItemIds (state, checkedItemIds) {
    state.checkedItemIds = checkedItemIds
  },
  updateItemsOrder (state, { newIndex, oldIndex }) {
    state.items.splice(newIndex, 0, state.items.splice(oldIndex, 1)[0])
  },
  setCheckedItemById (state, { id, isChecked }) {
    const checkedItemIds = [...state.checkedItemIds]
    const index = checkedItemIds.indexOf(id)
    if (isChecked && index === -1) {
      checkedItemIds.push(id)
    } else if (!isChecked && index !== -1) {
      checkedItemIds.splice(index, 1)
    }
    state.checkedItemIds = checkedItemIds
  }
}

export const actions = {
  initializeItems ({ commit }, itemsCount = 5) {
    const items = []
    for (let i = 0; i < itemsCount; i++) {
      items.push({
        id: i + 1,
        title: `Item ${i + 1}`
      })
    }
    commit('setItems', items)
    commit('setCheckedItemIds', [])
  }
}
