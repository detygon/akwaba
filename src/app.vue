<template>
  <div class="app-root" data-app>
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
    <!-- global loading dialog -->
    <v-dialog v-model="dialog" hide-overlay persistent width="300">
      <v-card color="primary" dark>
        <v-card-text>
          Please stand by
          <v-progress-linear
            indeterminate
            color="white"
            class="mb-0"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import AppEvents from '@/event'

export default {
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
      dialog: false,
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
