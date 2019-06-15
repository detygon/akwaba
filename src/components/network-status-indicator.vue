<template>
  <v-alert
    :value="visible"
    :type="isOnline ? 'success' : 'warning'"
    :dismissible="true"
  >
    {{ message }}
  </v-alert>
</template>

<script>
export default {
  name: 'NetworkStatusIndicator',
  props: {
    visible: {
      type: Boolean,
    },
  },
  data: () => ({
    isOnline: true,
  }),
  computed: {
    message() {
      return this.isOnline
        ? 'You have access to the Internet'
        : 'You are not connected to the Internet !'
    },
  },
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
        this.$emit('changed:network', this.isOnline)
      } else {
        this.isOnline = window.navigator.onLine
        this.$emit('changed:network', this.isOnline)
      }
    },
  },
}
</script>
