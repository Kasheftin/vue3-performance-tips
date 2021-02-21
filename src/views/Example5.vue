<template>
  <div>
    <p>
      <input v-model="itemsCount" :style="{ width: '100px' }" type="number">
      <button @click="isActive = !isActive">
        {{ isActive ? 'Hide Items' : `Show ${itemsCount} Items` }}
      </button>
    </p>
    <p>
      <label>
        <input v-model="intersectionObserverIsActive" type="checkbox">
          Enable IntersectionObserver
      </label>
    </p>
    <div v-if="isActive && Number(itemsCount)">
      <div
        v-for="i in Number(itemsCount)"
        :key="i"
        v-node-intersect="intersectionObserverIsActive ? intersectionObserver : undefined"
        :class="{
          'rr-intersectionable': intersectionObserverIsActive
        }"
      >
        <HeavyItem />
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import HeavyItem from '@/components/HeavyItem.vue'
import NodeIntersect from '@/directives/NodeIntersect'

export default defineComponent({
  components: {
    HeavyItem
  },
  directives: {
    NodeIntersect
  },
  data () {
    return {
      itemsCount: 100,
      isActive: false,
      intersectionObserver: null,
      intersectionObserverIsActive: false
    }
  },
  mounted () {
    this.intersectionObserver = new IntersectionObserver(this.handleIntersection)
  },
  methods: {
    handleIntersection (entries) {
      entries.forEach((entry) => {
        const className = 'rr-intersectionable--invisible'
        if (entry.isIntersecting && entry.target.classList.contains(className)) {
          entry.target.classList.remove(className)
        } else if (!entry.isIntersecting && !entry.target.classList.contains(className)) {
          entry.target.classList.add(className)
        }
      })
    }
  }
})
</script>
