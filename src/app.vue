<template>
  <div class="app-root">
    <router-view :key="$route.name"></router-view>
    <!-- global snackbar -->
    <v-snackbar
      v-model="snackbar.show"
      :color="snackbar.color"
      :bottom="snackbar.y === 'bottom'"
      :left="snackbar.x === 'left'"
      :multi-line="snackbar.mode === 'multi-line'"
      :right="snackbar.x === 'right'"
      :timeout="snackbar.timeout"
      :top="snackbar.y === 'top'"
      :vertical="snackbar.mode === 'vertical'"
    >
      {{ snackbar.text }}
      <v-btn dark flat icon @click.native="snackbar.show = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import NetworkStatusIndicator from '@/components/network-status-indicator.vue'
import AppEvents from '@/event'

export default {
  components: {
    NetworkStatusIndicator,
  },
  data() {
    return {
      rightDrawer: false,
      snackbar: {
        show: false,
        text: '',
        color: '',
        y: 'top',
        x: null,
        timeout: 6000,
        mode: '',
      },
    }
  },
  created() {
    AppEvents.forEach((event) => {
      this.$on(event.name, event.callback)
    })
    window.$app = this
  },
}
</script>
