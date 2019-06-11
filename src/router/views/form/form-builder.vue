<template>
  <div class="container fluid">
    <FormEditor :key="formKey" :data="form.formData" @save="handleSave" />
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
  }),
  created() {
    this.form = JSON.parse(sessionStorage.getItem('current-form')) || {}
  },
  beforeRouteLeave(to, from, next) {
    sessionStorage.removeItem('current-form')
    next()
  },
  methods: {
    isFormValid(data) {
      return data.every((item) => item.attrs.name || item.attrs.id)
    },
    async updateForm(data) {
      const db = await dbService.get()
      const query = db.forms
        .findOne()
        .where('id')
        .equals(this.form.id)
      await query.update({ $set: { formData: data } })
    },
    async handleSave(data) {
      if (!this.isFormValid(Object.values(data.fields))) {
        console.log('Error')
        return
      }

      const db = await dbService.get()

      if (this.form.formData) {
        await this.updateForm(data)
        return
      }

      const item = {
        formData: data,
        id: Date.now().toString(),
        name: Math.random()
          .toString(36)
          .substring(7),
        description: 'This is a description',
      }

      db.forms.insert(item)
      // Force a rerender of the component
      ++this.formKey
    },
  },
}
</script>
