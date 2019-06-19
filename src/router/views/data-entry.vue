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
        let inputLabel = ''

        if (_done.includes(inputName)) {
          return
        }

        const el = entry.data.find((x) => x.name === inputName)

        if (el) {
          let inputValue = null

          if (input.type === 'radio') {
            const radioEl = this.$refs.form.querySelector(
              `[name="${input.name}"]:checked`
            )
            inputValue = radioEl.value
            inputLabel = this.$refs.form.querySelector(
              `label[for="${radioEl.id}"]`
            )
          }

          if (input.type === 'checkbox') {
            const boxes = this.$refs.form.querySelectorAll(
              `[name="${input.name}"]:checked`
            )
            inputValue = Array.from(boxes).map((x) => x.value)
            inputLabel = this.$refs.form.querySelector(
              `label[for="${boxes[0].id}"]`
            )
          }

          entry.data[entry.data.indexOf(el)].value = inputValue
          entry.data[entry.data.indexOf(el)].label = inputLabel.textContent
          _done.push(inputName)
          return
        }

        inputLabel = this.$refs.form.querySelector(`label[for="${input.id}"]`)

        function getSelectLabel(input) {
          return input
            .querySelector(`option[value="${input.value}"]`)
            .getAttribute('label')
        }

        entry.data.push({
          name: inputName,
          type: input.type,
          value: input.value,
          label: input.type.includes('select')
            ? getSelectLabel(input)
            : inputLabel.textContent,
        })
      })

      db.responses.insert(entry).then(() => {
        window.$app.$emit('APP_RESOURCE_SAVED', entry)
        this.$refs.form.reset()
      })
    },
  },
}
</script>
