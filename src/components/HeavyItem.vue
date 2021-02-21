<template>
  <div class="rr-item">
    <div class="rr-item__image">
      <div :style="style">
        <Tiger v-if="isActive" :style="style" class="rr-item__svg" />
      </div>
    </div>
    <div class="rr-item__text">
      <div>Lateness: <strong>{{ lateness }}</strong> ms</div>
      <div>
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Tiger from './Tiger'

export default defineComponent({
  components: {
    Tiger
  },
  props: {
    size: {
      type: Number,
      default: 64
    },
    interval: {
      type: Number,
      default: 500
    }
  },
  data () {
    return {
      isActive: false,
      text: Array(Math.ceil(Math.random() * 10)).fill('Lorem ipsum dolor sit amet.').join(' '),
      runsCount: -1,
      startedAt: 0,
      currentTimestamp: 0
    }
  },
  computed: {
    style () {
      return { width: this.size + 'px', height: this.size + 'px' }
    },
    lateness () {
      return this.currentTimestamp - this.startedAt - this.runsCount * this.interval
    }
  },
  mounted () {
    this.startedAt = (new Date()).getTime()
    const run = () => {
      this.currentTimestamp = (new Date()).getTime()
      this.isActive = !this.isActive
      this.runsCount++
      this._timeout = setTimeout(run, 500)
    }
    run()
  },
  beforeUnmount () {
    this._timeout && clearTimeout(this._timeout)
  }
})
</script>
