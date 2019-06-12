<template>
  <div class="container fluid">
    <v-toolbar flat color="white">
      <v-layout row>
        <v-flex sm12 xs12>
          <v-toolbar-items class="mt-1">
            <v-select
              :items="items"
              solo
              label="Form name"
              @change="getFormContents"
            ></v-select>
            <v-select
              :items="data"
              solo
              label="Data item"
              @change="makeDataset"
            ></v-select>
            <v-select
              v-model="type"
              :items="charts"
              solo
              label="Chart type"
            ></v-select>
          </v-toolbar-items>
        </v-flex>
      </v-layout>
    </v-toolbar>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12 xs12>
          <VWidget title="Analysis">
            <div slot="widget-content">
              <EChart
                v-if="dataset.length"
                :key="chartKey || type"
                :path-option="[
                  ['dataset.source', dataset],
                  [
                    'color',
                    [
                      color.amber.base,
                      color.indigo.base,
                      color.pink.base,
                      color.green.base,
                      color.teal.base,
                      color.purple.base,
                    ],
                  ],
                  ['legend.orient', 'horizontal'],
                  ['legend.y', 'bottom'],
                  ['xAxis.show', false],
                  ['yAxis.show', false],
                  ['series[0].type', type],
                  ['series[0].avoidLabelOverlap', true],
                  ['series[0].radius', ['50%', '70%']],
                ]"
                width="100%"
              >
              </EChart>
              <template v-else>
                <v-alert type="warning" :value="true">
                  No dataset
                </v-alert>
              </template>
            </div>
          </VWidget>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import dbService from '@/service/db-service'
import EChart from '@/components/e-chart'
import VWidget from '@/components/v-widget.vue'
import Material from 'vuetify/es5/util/colors'
import { groupBy, map } from 'lodash'

export default {
  name: 'Statistics',
  components: {
    EChart,
    VWidget,
  },
  data: () => ({
    forms: [],
    data: [],
    contents: [],
    sub: null,
    charts: [{ text: 'Pie Chart', value: 'pie' }],
    dataset: [],
    color: Material,
    type: 'pie',
    chartKey: null,
  }),
  computed: {
    items() {
      return this.forms.map((form) => ({ text: form.name, value: form.id }))
    },
  },
  async mounted() {
    const db = await dbService.get()
    this.sub = db.forms
      .find({ name: { $regex: /\w/ } })
      .$.subscribe((forms) => (this.forms = forms))
  },
  beforeDestroy() {
    this.sub.unsubscribe()
  },
  methods: {
    setData(formId) {
      const form = this.forms.find((form) => form.id === formId)

      if (this.contents.length === 0) return

      this.data = this.contents[0].data.map((x) => {
        const field = Object.values(form.formData.fields)
          .filter(
            (field) => field.attrs.type !== 'text' && field.tag !== 'textarea'
          )
          .find(
            (field) => field.attrs.name === x.name || field.attrs.id === x.name
          )

        return field ? { text: field.config.label, value: x.name } : {}
      })
    },
    async getFormContents(formId) {
      const db = await dbService.get()
      this.contents = await db.contents
        .find()
        .where('formId')
        .eq(formId)
        .exec()

      this.setData(formId)
    },
    makeDataset(inputName) {
      const dataset = map(this.contents, (item) => {
        const entry = item.data.find((entry) => entry.name === inputName)
        return { name: entry.label }
      })

      this.dataset = map(groupBy(dataset, 'name'), (item) => {
        return { name: item[0].name, value: item.length }
      })

      this.chartKey = Date.now()
    },
  },
}
</script>
