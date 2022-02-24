<template>
  <div>
    <div>
      <button @click="addItems">Add 10 items</button>
      <button @click="reset">Reset store</button>
      <button v-if="checkedIds.length" @click="deleteCheckedItems">
        Delete {{ checkedIds.length }} checked item{{ checkedIds.length === 1 ? '' : 's' }}
      </button>
    </div>
    <draggable
      :value="extendedItemsNested"
      @update="updateItemsOrder"
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
import { mapGetters, mapState } from 'vuex'
import uniqid from 'uniqid'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import ItemWithRename from '@/components/ItemWithRename'

export default defineComponent({
  components: {
    draggable,
    ItemWithRename
  },
  computed: {
    ...mapState('example4', ['checkedIds']),
    ...mapGetters('example4', ['extendedItemsNested'])
  },
  beforeUnmount () {
    this.reset()
  },
  methods: {
    updateItemsOrder (event) {
      if (event.type === 'update') {
        this.$store.commit('example4/updateItemsOrder', { newIndex: event.newIndex, oldIndex: event.oldIndex })
      }
    },
    setCheckedItemById ({ id, isChecked }) {
      this.$store.commit('example4/setCheckedItemById', { id, isChecked })
    },
    renameItem ({ id, title }) {
      this.$store.commit('example4/renameItem', { id, title })
    },
    addItems () {
      this.$store.commit('example4/addItems', Array(10).fill().map(() => this.createHeavyItem(2)))
    },
    reset () {
      this.$store.commit('example4/reset')
    },
    deleteCheckedItems () {
      this.$store.commit('example4/deleteCheckedItems')
    },
    createHeavyItem (it, childrenCount = 10) {
      const id = uniqid()
      return {
        id,
        title: `Item ${id}`,
        hashes: Array(10).fill('Lorem ipsum dolor sit amet.'),
        children: it ? Array(childrenCount).fill().map(() => this.createHeavyItem(it - 1, childrenCount)) : []
      }
    }
  }
})
</script>
