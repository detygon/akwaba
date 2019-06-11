<template>
  <div class="container fluid">
    <FormBuilder :data="form.formData" @save="handleSave" :key="formKey" />
  </div>
</template>

<script>
import FormBuilder from '@/components/form-builder.vue'
import dbService from '@/service/db-service'

export default {
  name: 'FormEditor',
  components: {
    FormBuilder,
  },
  props: {
    form: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    formKey: 1,
  }),
  computed: {
    isFormValid(data) {
      return data.every((item) => item.attrs.name)
    },
  },
  methods: {
    async updateForm(data) {
      const db = await dbService.get()
      const query = db.forms
        .findOne()
        .where('id')
        .equals(this.form.id)
      await query.update({ $set: { formData: data } })
    },
    async handleSave(data) {
      // this.isFormValid(data.fields)

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
