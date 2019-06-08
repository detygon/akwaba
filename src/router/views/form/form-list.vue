<template>
  <div class="container fluid">
    <v-toolbar flat color="white">
      <v-toolbar-title>Form templates</v-toolbar-title>
      <v-divider class="mx-2" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark class="mb-2" :to="{ name: 'new-form' }">
        New Form
      </v-btn>
    </v-toolbar>
    <v-data-table :headers="headers" :items="forms" class="elevation-1">
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-xs-left">{{ props.item.description }}</td>
        <td class="justify-center layout px-0">
          <v-icon small class="mr-2" @click="editItem(props.item)">
            edit
          </v-icon>
          <v-icon small @click="deleteItem(props.item)">
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
    this.sub = db.forms
      .find()
      .$.subscribe((forms) => (this.forms = forms || []))
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  methods: {
    deleteItem(item) {
      const index = this.desserts.indexOf(item)
      confirm('Are you sure you want to delete this item?') &&
        this.desserts.splice(index, 1)
    },
  },
}
</script>
