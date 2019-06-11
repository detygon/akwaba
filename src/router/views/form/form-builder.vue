<template>
  <div class="container fluid">
    <v-alert :value="error" type="error" class="mb-2">
      Some elements are missing a "name" or "id" attribute.
    </v-alert>
    <FormEditor :key="formKey" :data="form.formData" @save="handleSave" />
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Save form</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="name"
                  label="Name*"
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  label="Description"
                  hint="Give a short description of the form"
                  rows="3"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="primary darken-1" :disabled="!name" flat @click="save">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import FormEditor from '@/components/form-editor.vue'
import dbService from '@/service/db-service'

export default {
  name: 'FormBuilder',
  components: {
    FormEditor,
  },
  data: () => ({
    formKey: 1,
    form: {},
    dialog: false,
    name: '',
    description: '',
    data: null,
    error: false,
  }),
  created() {
    this.form = JSON.parse(sessionStorage.getItem('current-form')) || {}
  },
  mounted() {
    if (this.form.formData) {
      this.$route.meta.title = `Edit ${this.form.name}`
    }
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem('current-form')
    next()
  },
  methods: {
    isFormValid(data) {
      return data.every((item) => item.attrs.name || item.attrs.id)
    },
    async update(data) {
      const db = await dbService.get()
      const query = db.forms
        .findOne()
        .where('id')
        .equals(this.form.id)
      await query.update({
        $set: {
          formData: this.data,
          name: this.name,
          description: this.description,
        },
      })
    },
    async save() {
      const db = await dbService.get()

      if (this.form.formData) {
        await this.update(this.data)
        window.$app.$emit('APP_RESOURCE_SAVED')
        this.dialog = false
        return
      }

      const item = {
        formData: this.data,
        id: Date.now().toString(),
        name: this.name,
        description: this.description,
      }

      db.forms.insert(item).then(() => {
        window.$app.$emit('APP_RESOURCE_SAVED', item)
        // Force a rerender of the component
        ++this.formKey
      })

      this.dialog = false
    },
    async handleSave(data) {
      if (!this.isFormValid(Object.values(data.fields))) {
        this.error = true
        return
      }

      this.error = false
      this.data = data

      if (this.form.formData) {
        this.name = this.form.name
        this.description = this.form.description
      }

      this.dialog = true
    },
  },
}
</script>
