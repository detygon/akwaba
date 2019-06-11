export default [
  {
    name: 'APP_SYNCED',
    callback: function(e) {},
  },
  {
    name: 'APP_RESOURCE_SAVED',
    callback: function(e) {
      this.snackbar = {
        ...this.snackbar,
        show: true,
        color: 'green',
        text: 'This item was saved successfully.',
      }
    },
  },
]
