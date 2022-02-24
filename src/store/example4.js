export const state = () => ({
  ids: [],
  itemsByIds: {},
  checkedIds: []
})

export const getters = {
  checkedIdsRev (state) {
    return state.checkedIds.reduce((out, id) => {
      out[id] = true
      return out
    }, {})
  },
  extendedItems (state, getters) {
    return state.ids.map(id => ({
      ...state.itemsByIds[id],
      isChecked: !!getters.checkedIdsRev[id]
    }))
  },
  extendedItemsByIds (state, getters) {
    return getters.extendedItems.reduce((out, extendedItem) => {
      out[extendedItem.id] = extendedItem
      return out
    }, {})
  },
  extendedItemsNested (state, getters) {
    return state.ids.map(id => ({
      id,
      item: state.itemsByIds[id],
      isChecked: !!getters.checkedIdsRev[id]
    }))
  }
}

export const mutations = {
  reset (state) {
    state.ids = []
    state.itemsByIds = {}
    state.checkedIds = []
  },
  addItems (state, items) {
    const ids = [...state.ids]
    const itemsByIds = { ...state.itemsByIds }
    items.forEach((item) => {
      if (!ids.includes(item.id)) {
        ids.push(item.id)
      }
      itemsByIds[item.id] = Object.freeze(item)
    })
    state.ids = ids
    state.itemsByIds = itemsByIds
  },
  updateItemsOrder (state, { newIndex, oldIndex }) {
    state.ids.splice(newIndex, 0, state.ids.splice(oldIndex, 1)[0])
  },
  setItemsOrder (state, ids) {
    state.ids = ids
  },
  renameItem (state, { id, title }) {
    const item = state.itemsByIds[id]
    if (item) {
      state.itemsByIds[id] = Object.freeze({
        ...item,
        title
      })
    }
  },
  setCheckedItemById (state, { id, isChecked }) {
    const index = state.checkedIds.indexOf(id)
    if (isChecked && index === -1) {
      state.checkedIds.push(id)
    } else if (!isChecked && index !== -1) {
      state.checkedIds.splice(index, 1)
    }
  },
  deleteCheckedItems (state) {
    state.ids = state.ids.filter(id => !state.checkedIds.includes(id))
    state.itemsByIds = state.ids.reduce((out, id) => {
      out[id] = state.itemsByIds[id]
      return out
    }, {})
    state.checkedIds = []
  }
}
