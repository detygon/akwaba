<template>
  <div ref="formeo"></div>
</template>

<script>
import { FormeoRenderer } from 'formeo'
import 'formeo/dist/formeo.min.css'

export default {
  name: 'FormRenderer',
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
    formeoOpts: {
      type: Object,
      default: () => ({}),
    },
  },
  data: () => ({
    formeo: null,
  }),
  mounted() {
    this.formeoOpts.renderContainer = this.$refs.formeo
    this.formeoOpts.external = {}
    this.formeo = new FormeoRenderer(this.formeoOpts)
    this.formeo.render(this.data)
  },
  methods: {},
}
</script>
