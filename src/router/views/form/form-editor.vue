<template>
  <div class="container fluid">
    <FormBuilder :data="formData" @save="handleSave" />
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
  data: () => ({
    formData: {},
  }),
  created() {
    const data = localStorage.getItem('formeo-formData')
    this.formData = data ? JSON.parse(data) : {}
  },
  methods: {
    async handleSave(data) {
      const db = await dbService.get()

      const item = {
        formData: data,
        id: Date.now().toString(),
        name: 'Some name',
        description: 'This is a description',
      }

      db.forms.insert(item)
    },
  },
}
</script>
