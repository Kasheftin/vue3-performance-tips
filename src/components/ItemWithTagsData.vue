<template>
  <div class="rr-item rr-item--multiline">
    <div class="rr-item__title">
      {{ item.title }}
    </div>
    <div class="rr-item__tags">
      <div>
        Tags:
      </div>
      <div v-for="tag in tags" :key="tag.id" class="rr-item-tag">
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
    tagsData: {
      type: String,
      default: null
    }
  },
  computed: {
    tags () {
      try {
        return this.tagsData ? JSON.parse(this.tagsData) : []
      } catch (error) {
        console.error('JSON.parse error', error)
        return []
      }
    }
  },
  updated () {
    console.count('ItemWithTag updated')
  }
})
</script>
