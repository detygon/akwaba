<template>
  <v-layout row class="align-center layout px-4 pt-4 app--page-header">
    <div class="page-header-left">
      <h3 class="pr-3">{{ $route.meta.title || '' }}</h3>
    </div>
    <template>
      <a class="disabled" disabled> <v-icon small>home</v-icon> &nbsp; - </a>
    </template>
    <v-breadcrumbs divider="-" :items="breadcrumbs">
      <template v-slot:item="props">
        <a :href="props.item.to" :class="[props.item.disabled && 'disabled']">
          {{ props.item.text }}
        </a>
      </template>
    </v-breadcrumbs>
    <v-spacer></v-spacer>
    <div class="page-header-right"> </div>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      title: 'Home',
      breadcrumbs: [],
    }
  },
  watch: {
    '$route.path': function(newVal) {
      this.computeBreadcrumbs()
    },
  },
  created() {
    this.computeBreadcrumbs()
  },
  methods: {
    computeBreadcrumbs() {
      let breadcrumbs = []
      let appends = []
      appends = this.$route.matched.map((item) => {
        return {
          text: item.meta.title || '',
          to: item.path || '/',
          disabled: item.path === this.$route.path,
        }
      })
      this.breadcrumbs = breadcrumbs.concat(appends)
    },
  },
}
</script>

<style lang="stylus" scoped>
.disabled
  color: grey
  pointer-events: none
  text-decoration: blink
</style>
