<template>
  <div>
    <div>
      <button @click="addItems">Add 10 items</button>
      <button @click="reset">Reset store</button>
      <button @click="randomize">Randomize Items Order</button>
    </div>
    <draggable
      :list="extendedItemsNested"
      @change="updateItemsOrder"
    >
      <ItemWithRename
        v-for="extendedItem in extendedItemsNested"
        :key="extendedItem.id"
        :item="extendedItem.item"
        :is-checked="extendedItem.isChecked"
        @set-checked="setCheckedItemById"
        @rename="renameItem"
      />
    </draggable>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import ItemWithRename from '@/components/ItemWithRename'

let itemId = 0

export default defineComponent({
  components: {
    ItemWithRename,
    draggable
  },
  computed: {
    ...mapState('example4', ['ids']),
    ...mapGetters('example4', {
      extendedItemsNested: 'extendedItemsNested'
    })
  },
  beforeUnmount () {
    this.reset()
  },
  methods: {
    setCheckedItemById ({ id, isChecked }) {
      this.$store.commit('example4/setCheckedItemById', { id, isChecked })
    },
    renameItem ({ id, title }) {
      this.$store.commit('example4/renameItem', { id, title })
    },
    addItems () {
      this.$store.commit('example4/addItems', Array(10).fill().map(this.getNewItem))
    },
    reset () {
      this.$store.commit('example4/reset')
    },
    getNewItem () {
      itemId++
      return {
        id: itemId,
        title: `Item ${itemId}`,
        hashes: Array(10).fill('Lorem ipsum dolor sit amet.')
      }
    },
    updateItemsOrder (event) {
      if (event.moved) {
        this.$store.commit('example4/updateItemsOrder', event.moved)
      }
    },
    randomize () {
      const ids = [...this.ids]
      const newIds = []
      while (ids.length) {
        const r = Math.floor(Math.random() * ids.length)
        newIds.push(ids[r])
        ids.splice(r, 1)
      }
      this.$store.commit('example4/setItemsOrder', newIds)
    }
  }
})
</script>
