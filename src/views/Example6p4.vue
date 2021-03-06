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
            <input
              :value="tag.title"
              class="rr-input-short"
              @input="updateTagTitle({ tagId: tag.id, title: $event.target.value })"
            >
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in plainItems" :key="item.id">
          <td>
            <input
              :value="item.title"
              class="rr-input-short"
              @input="updateItemTitle({ itemId: item.id, title: $event.target.value })"
            >
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
    <ItemWithTags
      v-for="combinedEntry in itemsWithTags"
      :key="combinedEntry.id"
      :item="combinedEntry.item"
      :tags="combinedEntry.allTags"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapState, mapGetters } from 'vuex'
import ItemWithTags from '@/components/ItemWithTags'

export default defineComponent({
  components: {
    ItemWithTags
  },
  computed: {
    ...mapState('example6p4', ['itemTags']),
    ...mapGetters('example6p4', {
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
      this.$store.commit('example6p4/reset')
      this.$store.commit('example6p4/addItems', items)
      this.$store.commit('example6p4/addTags', tags)
    },
    toggleItemTag (itemId, tagId) {
      this.$store.commit('example6p4/toggleItemTag', { itemId, tagId })
    },
    updateTagTitle ({ tagId, title }) {
      this.$store.commit('example6p4/updateTagTitle', { tagId, title })
    },
    updateItemTitle ({ itemId, title }) {
      this.$store.commit('example6p4/updateItemTitle', { itemId, title })
    }
  }
})
</script>
