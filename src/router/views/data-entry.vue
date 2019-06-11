<template>
  <div class="container fluid">
    <template v-if="form">
      <form @submit.prevent="handleSubmit" ref="form">
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

      const inputs = Array.from(data.target).filter((input) => {
        return (
          !input.type === 'submit' ||
          (['radio', 'checkbox'].includes(input.type) && input.checked)
        )
      })

      const checkeds = []

      for (const input of inputs) {
        if (input.type === 'checkbox') {
          checkeds.push(input.value)
        }

        item.data.push({
          name: input.name.replace(/\[\]/g, ''),
          type: input.type,
          value: input.type === 'checkbox' ? checkeds : input.value,
        })
      }

      db.contents.insert(item).then(() => {
        this.$refs.form.reset()
      })
    },
  },
}
</script>
