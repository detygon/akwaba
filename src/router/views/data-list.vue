<template>
  <div class="container fluid">
    <v-data-table
      :headers="headers"
      :items="items"
      :loading="!sub"
      class="elevation-1"
    >
      <template v-slot:items="props">
        <td v-for="header in headers" :key="header.value">
          {{ formatData(props.item[header.value]) }}
        </td>
      </template>
    </v-data-table>
  </div>
</template>

<script>
import dbService from '@/service/db-service'

export default {
  name: 'DataList',
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    data: [],
    sub: null,
    headers: [],
  }),
  computed: {
    items() {
      return this.data
    },
  },
  async mounted() {
    const db = await dbService.get()
    this.sub = db.contents
      .find()
      .where('formId')
      .equals(this.$route.params.id)
      .$.subscribe((contents) => {
        this.data = this.buildData(contents)
      })

    this.headers = this.buildHeaders()
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  methods: {
    buildHeaders() {
      const headers = []
      const fields = this.form.formData.fields

      for (const key in fields) {
        if (fields.hasOwnProperty(key)) {
          const element = fields[key]
          headers.push({
            text: element.config.label,
            value: element.attrs.name || element.attrs.id,
            sortable: false,
          })
        }
      }

      return headers
    },
    buildData(contents) {
      const data = []

      for (const item of contents) {
        const itemData = {}

        for (const x of item.data) {
          itemData[x.name] = x.value
        }

        data.push(itemData)
      }

      return data
    },
    formatData(item) {
      return Array.isArray(item) ? item.join(',') : item
    },
  },
}
</script>
