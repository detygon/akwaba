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
      .$.subscribe((form) => {
        this.form = form || {}
      })
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  methods: {
    handleSubmit(data) {
      console.log(data)
    },
  },
}
</script>
