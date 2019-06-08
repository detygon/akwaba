<template>
  <v-alert :value="!isOnline" type="warning" :dismissible="true">
    You are not connected to the internet !
  </v-alert>
</template>

<script>
export default {
  name: 'NetworkStatusIndicator',
  data: () => ({
    isOnline: true,
  }),
  mounted() {
    this.updateStatus()
    window.addEventListener('online', this.updateStatus)
    window.addEventListener('offline', this.updateStatus)
  },
  beforeDestroy() {
    window.removeEventListener('online', this.updateStatus)
    window.removeEventListener('offline', this.updateStatus)
  },
  methods: {
    updateStatus: function() {
      if (typeof window.navigator.onLine === 'undefined') {
        this.isOnline = true
      } else {
        this.isOnline = window.navigator.onLine
      }
    },
  },
}
</script>
