<template>
  <div class="container fluid">
    <v-toolbar flat color="white">
      <v-spacer />
      <v-btn color="primary" dark class="mb-2" :to="{ name: 'new-form' }">
        New Form
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="forms" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="px-0">
          <v-icon small class="mr-3" title="View" @click="showItem(props.item)">
            remove_red_eye
          </v-icon>
          <v-icon small class="mr-3" title="Fill" @click="fillItem(props.item)">
            launch
          </v-icon>
          <v-icon small class="mr-3" title="Edit" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small title="Delete" @click="deleteItem(props.item)">
            delete
          </v-icon>
        </td>
      </template>
      <template v-slot:no-data>
        No data
      </template>
    </v-data-table>
  </div>
</template>

<script>
import dbService from '@/service/db-service'

export default {
  data: () => ({
    dialog: false,
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    forms: [],
    sub: null,
    loading: false,
  }),
  async mounted() {
    const db = await dbService.get()
    this.sub = db.forms.find().$.subscribe((forms) => (this.forms = forms))
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  methods: {
    deleteItem(item) {
      confirm('Are you sure you want to delete this item?') && item.remove()
    },
    showItem(item) {
      this.$router.push({
        name: 'data-list',
        params: { id: item.id, form: item },
      })
    },
    fillItem(item) {
      this.$router.push({
        name: 'data-entry',
        params: { id: item.id },
      })
    },
    editItem(item) {
      this.$router.push({ name: 'new-form', params: { form: item } })
    },
  },
}
</script>
