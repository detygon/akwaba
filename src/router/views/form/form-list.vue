<template>
  <div class="container fluid">
    <v-toolbar flat color="white">
      <v-text-field
        v-model="search"
        append-icon="search"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
      <v-spacer />
      <v-btn
        color="primary"
        dark
        :to="{ name: 'form-builder' }"
        title="Create a form"
      >
        <v-icon class="mr-1">
          add
        </v-icon>
        New
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="forms"
      :search="search"
      class="elevation-1"
    >
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
    headers: [
      { text: 'Name', value: 'name' },
      { text: 'Description', value: 'description', sortable: false },
      { text: 'Actions', value: 'name', sortable: false },
    ],
    forms: [],
    sub: null,
    search: '',
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
      sessionStorage.setItem('current-form', JSON.stringify(item))
      this.$router.push({ name: 'data-list', params: { id: item.id } })
    },
    fillItem(item) {
      this.$router.push({ name: 'data-entry', params: { id: item.id } })
    },
    editItem(item) {
      sessionStorage.setItem('current-form', JSON.stringify(item))
      this.$router.push({ name: 'form-builder' })
    },
  },
}
</script>
