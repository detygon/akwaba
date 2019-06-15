<template>
  <v-app id="inspire" class="app dashboard">
    <AppDrawer
      v-click-outside="handleDrawerVisiable"
      class="app--drawer"
      :show-drawer="showDrawer"
    ></AppDrawer>
    <AppToolbar
      class="app--toolbar"
      @side-icon-click="handleDrawerVisiable"
    ></AppToolbar>
    <v-content>
      <!-- Page Header -->
      <PageHeader></PageHeader>
      <div class="page-wrapper">
        <router-view></router-view>
      </div>
      <!-- App Footer -->
      <v-footer height="auto" class="white pa-3 app--footer">
        <v-spacer></v-spacer>
        <span class="caption mr-1">Coded with love </span>
        <v-icon color="pink" small>favorite</v-icon>
        <span class="caption">&nbsp; by Salomon Dion</span>
      </v-footer>
    </v-content>
    <!-- Go to top -->
    <AppFab />
  </v-app>
</template>

<script>
import AppDrawer from '@/components/app-drawer.vue'
import AppToolbar from '@/components/app-toolbar.vue'
import AppFab from '@/components/app-fab.vue'
import PageHeader from '@/components/page-header.vue'

export default {
  components: {
    AppDrawer,
    AppToolbar,
    AppFab,
    PageHeader,
  },
  directives: {
    'click-outside': {
      bind: function(el, binding, vNode) {
        // Provided expression must evaluate to a function.
        if (typeof binding.value !== 'function') {
          const compName = vNode.context.name
          let warn = `[Vue-click-outside:] provided expression '${binding.expression}' is not a function, but has to be`
          if (compName) {
            warn += `Found in component '${compName}'`
          }

          console.warn(warn)
        }
        // Define Handler and cache it on the element
        const bubble = binding.modifiers.bubble
        const handler = (e) => {
          if (bubble || (!el.contains(e.target) && el !== e.target)) {
            binding.value(e)
          }
        }
        el.__vueClickOutside__ = handler

        // add Event Listeners
        document.addEventListener('click', handler)
      },

      unbind: function(el, binding) {
        // Remove Event Listeners
        document.removeEventListener('click', el.__vueClickOutside__)
        el.__vueClickOutside__ = null
      },
    },
  },
  data() {
    return {
      showDrawer: window.innerWidth > 1200,
    }
  },
  methods: {
    handleDrawerVisiable() {
      this.showDrawer = !this.showDrawer
    },
  },
}
</script>

<style scoped>
.page-wrapper {
  min-height: calc(100vh - 64px - 50px - 81px);
}
</style>
