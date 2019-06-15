<template>
  <div>
    <div ref="formeo" class="wrapper"></div>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">What attribute would you like to add?</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12>
                <v-text-field
                  v-model="attr.name"
                  label="Name*"
                  autofocus
                  required
                ></v-text-field>
              </v-flex>
              <v-flex xs12>
                <v-text-field
                  v-model="attr.value"
                  label="Value*"
                  required
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">
            Close
          </v-btn>
          <v-btn
            color="primary darken-1"
            :disabled="!isValid"
            flat
            @click="addAttribute"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
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
        actions: {
          add: {},
        },
        sessionStorage: true,
      }),
    },
  },
  data: () => ({
    formeo: null,
    dialog: false,
    attr: {
      name: '',
      value: '',
    },
  }),
  computed: {
    isValid() {
      return this.attr.name && this.attr.value
    },
  },
  mounted() {
    this.formeoOpts.editorContainer = this.$refs.formeo
    this.formeoOpts.events.onSave = this.handleFormeoSaved.bind(this)
    this.formeoOpts.actions.add.attr = this.handleAddAttribute.bind(this)
    this.formeo = new FormeoEditor(this.formeoOpts, this.data)
  },
  methods: {
    handleFormeoSaved(data) {
      this.$emit('save', data.formData)
      sessionStorage.clear()
    },
    addAttribute() {
      this.dialog = false
      this.actionEvent.addAction(this.attr.name, this.attr.value)
      this.attr.name = ''
      this.attr.value = ''
    },
    handleAddAttribute(evt) {
      this.dialog = true
      this.actionEvent = evt
    },
  },
}
</script>
