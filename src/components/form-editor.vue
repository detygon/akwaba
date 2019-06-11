<template>
  <div ref="formeo" class="wrapper"></div>
</template>

<script>
import { FormeoEditor } from 'formeo'
import 'formeo/dist/formeo.min.css'

export default {
  name: 'FormEditor',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    formeoOpts: {
      type: Object,
      default: () => ({
        allowEdit: true,
        events: {},
        sessionStorage: true,
      }),
    },
  },
  data: () => ({
    formeo: null,
  }),
  mounted() {
    this.formeoOpts.editorContainer = this.$refs.formeo
    this.formeoOpts.events.onSave = this.handleFormeoSaved.bind(this)
    this.formeo = new FormeoEditor(this.formeoOpts, this.data)
  },
  methods: {
    handleFormeoSaved(data) {
      this.$emit('save', data.formData)
      sessionStorage.clear()
    },
  },
}
</script>
