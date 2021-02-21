<template>
  <div>
    <draggable
      :list="items"
      @change="updateItemsOrder"
    >
      <Item
        v-for="item in items"
        :key="item.id"
        :item="item"
        @set-checked="setCheckedItemById({ id: item.id, isChecked: $event })"
      />
    </draggable>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { VueDraggableNext as draggable } from 'vue-draggable-next'
import Item from '@/components/Item'

export default defineComponent({
  components: {
    draggable,
    Item
  },
  computed: {
    items () {
      return this.$store.getters['example1/extendedItems']
    },
    itemIds () {
      return this.items.map(item => item.id)
    },
    itemIdsTrigger () {
      return this.itemIds.join('-')
    }
  },
  watch: {
    itemIds () {
      console.log('itemIds object watcher run: saving new item order: ', this.itemIds)
    },
    itemIdsTrigger () {
      console.log('itemIdsTrigger primitive type watcher run: saving new item order', this.itemIds)
    }
  },
  created () {
    this.$store.dispatch('example1/initializeItems')
  },
  methods: {
    updateItemsOrder (event) {
      if (event.moved) {
        this.$store.commit('example1/updateItemsOrder', event.moved)
      }
    },
    setCheckedItemById ({ id, isChecked }) {
      this.$store.commit('example1/setCheckedItemById', { id, isChecked })
    }
  }
})
</script>
