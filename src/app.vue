<template>
  <div class="app-root">
    <router-view></router-view>
    <!-- global snackbar -->
    <v-snackbar
      :timeout="3000"
      bottom
      right
      :color="snackbar.color"
      v-model="snackbar.show"
    >
      {{ snackbar.text }}
      <v-btn dark flat @click.native="snackbar.show = false" icon>
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import NetworkStatusIndicator from '@/components/network-status-indicator.vue'

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
      },
    }
  },
}
</script>
