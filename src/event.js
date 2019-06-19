export default [
  {
    name: 'APP_SYNCED',
    callback: function() {},
  },
  {
    name: 'APP_RESOURCE_SAVED',
    callback: function(e) {
      this.snackbar = {
        ...this.snackbar,
        show: true,
        x: 'right',
        color: 'green',
        text: 'This item was saved successfully.',
      }
    },
  },
  {
    name: 'NOTIFY_SUCCESS',
    callback: function(text) {
      this.snackbar = {
        ...this.snackbar,
        show: true,
        color: 'green',
        text,
        x: 'right',
        timeout: 2000,
      }
    },
  },
  {
    name: 'NOTIFY_ERROR',
    callback: function(text) {
      this.snackbar = {
        ...this.snackbar,
        show: true,
        color: 'red',
        text,
        x: 'right',
        timeout: 2000,
      }
    },
  },
  {
    name: 'LOADING',
    callback: function(isLoading) {
      this.dialog = isLoading
    },
  },
]
