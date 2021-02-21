<template>
  <div>
    <div>
      <button @click="addItems">Add 10 items</button>
      <button @click="reset">Reset store</button>
      <button @click="randomize">Randomize Items Order</button>
    </div>
    <ItemWithRenameById3
      v-for="id in ids"
      :key="id"
      :item-id="id"
      @set-checked="setCheckedItemById"
      @rename="renameItem"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState } from 'vuex'
import ItemWithRenameById3 from '@/components/ItemWithRenameById3'

let itemId = 0

export default defineComponent({
  components: {
    ItemWithRenameById3
  },
  computed: {
    ...mapState('example4', ['ids'])
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
