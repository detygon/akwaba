<template>
  <div class="container fluid">
    <v-data-table
      :headers="headers"
      :items="data"
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
  data: () => ({
    data: [],
    sub: null,
    headers: [],
  }),
  async mounted() {
    const db = await dbService.get()
    this.sub = db.responses
      .find()
      .where('formId')
      .equals(this.$route.params.id)
      .$.subscribe((contents) => {
        this.data = this.buildData(contents)
      })

    this.headers = this.buildHeaders(
      JSON.parse(sessionStorage.getItem('current-form'))
    )
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem('current-form')
    next()
  },
  methods: {
    buildHeaders(form) {
      const headers = []
      const fields = form.formData.fields

      for (const value of Object.values(fields)) {
        headers.push({
          text: value.config.label,
          value: value.attrs.name || value.attrs.id,
          sortable: false,
        })
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
