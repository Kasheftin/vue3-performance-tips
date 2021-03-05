<template>
  <div>
    <div>
      <button @click="reset">Reset</button>
    </div>
    <table class="rr-fill-width rr-bordered-table">
      <thead>
        <tr>
          <th />
          <th v-for="tag in plainTags" :key="tag.id">
            {{ tag.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in plainItems" :key="item.id">
          <td>
            {{ item.title }}
          </td>
          <td v-for="tag in plainTags" :key="tag.id" class="rr-text-center">
            <input
              :checked="itemTags.includes(`${item.id}-${tag.id}`)"
              type="checkbox"
              @change="toggleItemTag(item.id, tag.id)"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <hr>
    <p>Items With Tags (Display only the first tag for each item):</p>
    <ItemWithTag
      v-for="combinedEntry in itemsWithTags"
      :key="combinedEntry.id"
      :item="combinedEntry.item"
      :tag="combinedEntry.firstTag"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
import ItemWithTag from '@/components/ItemWithTag'

export default defineComponent({
  components: {
    ItemWithTag
  },
  computed: {
    ...mapState('example6', ['itemTags']),
    ...mapGetters('example6', {
      plainItems: 'plainItems',
      plainTags: 'plainTags',
      itemsWithTags: 'itemsWithTags'
    })
  },
  created () {
    this.reset()
  },
  methods: {
    reset () {
      const items = Array(10).fill().map((value, index) => ({ id: index + 1, title: `Item ${index + 1}` }))
      const tags = Array(5).fill().map((value, index) => ({ id: index + 1, title: `Tag ${index + 1}` }))
      this.$store.commit('example6/reset')
      this.$store.commit('example6/addItems', items)
      this.$store.commit('example6/addTags', tags)
    },
    toggleItemTag (itemId, tagId) {
      this.$store.commit('example6/toggleItemTag', { itemId, tagId })
    }
  }
})
</script>
