import SelectiveObjectReuse from 'selective-object-reuse'

const sor = new SelectiveObjectReuse()

function sortTags (tag1, tag2) {
  const str1 = (tag1.title || '').toString().toLowerCase()
  const str2 = (tag2.title || '').toString().toLowerCase()
  if (str1 < str2) { return -1 }
  if (str1 > str2) { return 1 }
  return 0
}

export const state = () => ({
  ids: [],
  itemsByIds: {},
  tagsByIds: {},
  itemTags: []
})

export const getters = {
  plainItems (state) {
    return state.ids.map(id => state.itemsByIds[id])
  },
  plainTags (state) {
    return Object.values(state.tagsByIds).sort(sortTags)
  },
  itemsWithTags (state) {
    const tagIdsByItemIds = state.itemTags.reduce((out, key) => {
      const [itemId, tagId] = key.split('-').map(Number)
      if (!out[itemId]) {
        out[itemId] = [tagId]
      } else {
        out[itemId].push(tagId)
      }
      return out
    }, {})
    const out = state.ids.map(id => {
      const allTags = tagIdsByItemIds[id] ? tagIdsByItemIds[id].map(tagId => state.tagsByIds[tagId]).sort(sortTags) : []
      return {
        id,
        item: state.itemsByIds[id],
        firstTag: allTags.length ? allTags[0] : null,
        allTags
      }
    })
    return sor.wrap(out, 'itemsWithTags')
  }
}

export const mutations = {
  reset (state) {
    state.ids = []
    state.itemsByIds = {}
    state.tagsByIds = {}
    state.itemTags = []
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
  addTags (state, tags) {
    const tagsByIds = { ...state.tagsByIds }
    tags.forEach((tag) => {
      tagsByIds[tag.id] = Object.freeze(tag)
    })
    state.tagsByIds = tagsByIds
  },
  toggleItemTag (state, { itemId, tagId }) {
    const key = `${itemId}-${tagId}`
    const index = state.itemTags.indexOf(key)
    if (index === -1) {
      state.itemTags.push(key)
    } else {
      state.itemTags.splice(index, 1)
    }
  },
  updateTagTitle (state, { tagId, title }) {
    const tag = state.tagsByIds[tagId]
    if (tag) {
      state.tagsByIds[tagId] = Object.freeze({ ...tag, title })
    }
  },
  updateItemTitle (state, { itemId, title }) {
    const item = state.itemsByIds[itemId]
    if (item) {
      state.itemsByIds[itemId] = Object.freeze({ ...item, title })
    }
  }
}
