<template>
  <div v-if="item" class="rr-item">
    <div class="rr-item__check">
      <input
        v-model="itemIsChecked"
        :true-value="true"
        :false-value="false"
        type="checkbox"
      >
    </div>
    <div class="rr-item__title">
      {{ item.title }}
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
    }
  },
  computed: {
    itemIsChecked: {
      get () {
        return this.item.isChecked
      },
      set (value) {
        this.$emit('set-checked', value)
      }
    }
  }
})
</script>
