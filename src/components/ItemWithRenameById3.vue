<template>
  <div v-if="item" class="rr-item">
    <div class="rr-item__check">
      <input
        :checked="isChecked"
        type="checkbox"
        @change="$emit('set-checked', { id: item.id, isChecked: $event.target.checked })"
      >
    </div>
    <div class="rr-item__title">
      <input
        :value="item.title"
        @change="$emit('rename', { id: item.id, title: $event.target.value })"
      >
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    itemId: {
      type: Number,
      required: true
    }
  },
  computed: {
    item () {
      return this.$store.state.example4.itemsByIds[this.itemId]
    },
    isChecked () {
      return this.$store.state.example4.checkedIds.includes(this.itemId)
    }
  },
  updated () {
    console.count('ItemWithRenameById2 updated')
  }
})
</script>
