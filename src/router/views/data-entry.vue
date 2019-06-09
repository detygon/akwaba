<template>
  <div class="container fluid">
    <template v-if="form">
      <form @submit.prevent="handleSubmit">
        <FormeoRenderer :data="form.formData" />
        <v-btn color="success" type="submit" class="ml-0">
          Submit
        </v-btn>
      </form>
    </template>
  </div>
</template>

<script>
import FormeoRenderer from '@/components/form-renderer.vue'
import dbService from '@/service/db-service'

export default {
  name: 'DataEntry',
  components: {
    FormeoRenderer,
  },
  data: () => ({
    form: null,
    sub: null,
  }),
  async mounted() {
    const db = await dbService.get()
    this.sub = db.forms
      .findOne()
      .where('id')
      .equals(this.$route.params.id)
      .$.subscribe((form) => (this.form = form || {}))
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  methods: {
    async handleSubmit(data) {
      const db = await dbService.get()
      const item = {
        id: Date.now().toString(),
        formId: this.form.id,
        data: [],
      }

      for (const input of data.target) {
        if (input.type === 'submit') {
          continue
        }

        const inputLabel = document.querySelector(`label[for=${input.id}]`)

        const formItem = {
          name: input.name,
          type: input.type,
          label: inputLabel.textContent,
          value: input.value,
        }

        item.data.push(formItem)
      }

      db.contents.insert(item)
    },
  },
}
</script>
