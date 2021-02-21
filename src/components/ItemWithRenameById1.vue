<template>
  <div v-if="item" class="rr-item">
    <div class="rr-item__check">
      <input
        :checked="item.isChecked"
        type="checkbox"
        @change="$emit('set-checked', $event.target.checked)"
      >
    </div>
    <div class="rr-item__title">
      <input
        :value="item.title"
        @change="$emit('rename', $event.target.value)"
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
      return this.$store.getters['example4/extendedItemsByIds'][this.itemId]
    }
  },
  updated () {
    console.count('ItemWithRenameById1 updated')
  }
})
</script>
