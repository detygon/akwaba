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
    getFormElement(selector, all) {
      return all
        ? Array.from(this.$refs.form.querySelectorAll(selector))
        : this.$refs.form.querySelector(selector)
    },
    getLabel(input) {
      if (input.type.includes('select')) {
        return input
          .querySelector(`option[value="${input.value}"]`)
          .getAttribute('label')
      }

      if (input.type === 'radio') {
        const el = this.getFormElement(`[name="${input.name}"]:checked`)
        return this.getFormElement(`label[for="${el.id}"]`).textContent
      }

      if (input.type === 'checkbox') {
        const selector = `[name="${input.name}"]:checked`
        const boxes = this.getFormElement(selector, true)
        const labels = boxes.map((box) => {
          return this.getFormElement(`label[for="${box.id}"]`)
        })
        return labels.map((x) => x.textContent).join(',')
      }

      return this.getFormElement(`label[for="${input.id}"]`).textContent
    },
    async handleSubmit(data) {
      const db = await dbService.get()
      const _done = []
      const entry = {
        id: Date.now().toString(),
        formId: this.form.id,
        data: [],
      }

      const inputs = Array.from(data.target).filter((input) => {
        return (
          (['radio', 'checkbox'].includes(input.type) && input.checked) ||
          input.type !== 'submit'
        )
      })

      inputs.forEach((input) => {
        const inputName = input.name.replace(/\[\]/g, '')
        let inputValue = input.value

        if (_done.includes(inputName)) {
          return
        }

        // Process radios and input only once
        // we retrieve all checked innput only once
        // this avoid duplicating data for the same field
        if (['radio', 'checkbox'].includes(input.type)) {
          if (input.type === 'radio') {
            const el = this.getFormElement(`[name="${input.name}"]:checked`)
            inputValue = el.value
          }

          if (input.type === 'checkbox') {
            const selector = `[name="${input.name}"]:checked`
            const boxes = this.getFormElement(selector, true)
            inputValue = boxes.map((x) => x.value)
          }

          _done.push(inputName)
        }

        entry.data.push({
          name: inputName,
          type: input.type,
          value: inputValue,
          label: this.getLabel(input),
        })
      })

      db.responses.insert(entry).then(() => {
        window.$app.$emit('APP_RESOURCE_SAVED')
        this.$refs.form.reset()
      })
    },
  },
}
</script>
