<template>
  <div class="container fluid">
    <template v-if="form">
      <form ref="form" @submit.prevent="handleSubmit">
        <FormeoRenderer :data="form.formData" />
        <v-btn color="success" type="submit" class="ml-0">
          <v-icon class="mr-1">save</v-icon>
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
      const entry = {
        id: Date.now().toString(),
        formId: this.form.id,
        data: [],
      }

      let inputs = Array.from(data.target).filter((input) => {
        return (
          (['radio', 'checkbox'].includes(input.type) && input.checked) ||
          input.type !== 'submit'
        )
      })

      const _done = []

      inputs.forEach((input) => {
        const inputName = input.name.replace(/\[\]/g, '')

        if (_done.includes(inputName)) {
          return
        }

        const el = entry.data.find((x) => x.name === inputName)

        if (el) {
          let inputValue = null

          if (input.type === 'radio') {
            inputValue = this.$refs.form.querySelector(
              `[name="${input.name}"]:checked`
            ).value
          }

          if (input.type === 'checkbox') {
            inputValue = Array.from(
              this.$refs.form.querySelectorAll(`[name="${input.name}"]:checked`)
            ).map((x) => x.value)
          }

          entry.data[entry.data.indexOf(el)].value = inputValue
          _done.push(inputName)
          return
        }

        entry.data.push({
          name: inputName,
          type: input.type,
          value: input.value,
        })
      })

      db.contents.insert(entry).then(() => {
        window.$app.$emit('APP_RESOURCE_SAVED', entry)
        this.$refs.form.reset()
      })
    },
  },
}
</script>
