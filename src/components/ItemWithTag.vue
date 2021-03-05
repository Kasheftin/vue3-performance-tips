<template>
  <div class="rr-item rr-item--multiline">
    <div class="rr-item__title">
      {{ item.title }}
    </div>
    <div class="rr-item__tags">
      <div>
        First Item Tag:
      </div>
      <div v-if="tag" class="rr-item-tag">
        {{ tag.title }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    item: {
      type: Object,
      required: true
    },
    tag: {
      type: Object,
      default: null
    }
  },
  updated () {
    console.count('ItemWithTag updated')
  }
})
</script>
