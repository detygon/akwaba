<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12 xs12>
          <NetworkStatusIndicator />
        </v-flex>
        <v-flex sm4 xs4>
          <v-btn type="primary" @click="sync('up')">Sync up</v-btn>
          <v-btn type="primary" @click="sync('down')">Sync down</v-btn>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NetworkStatusIndicator from '@/components/network-status-indicator'
import dbService from '@/service/db-service'

export default {
  components: {
    NetworkStatusIndicator,
  },
  data: () => ({}),
  computed: {},
  methods: {
    async syncUp(db) {
      await db.forms.sync({
        remote: 'http://localhost:5984',
        direction: {
          pull: true,
          push: false,
        },
      })

      await db.contents.sync({
        remote: 'http://localhost:5984',
        direction: {
          pull: true,
          push: false,
        },
      })
    },
    async syncDown(db) {
      await db.forms.sync({
        remote: 'http://localhost:5984',
        direction: {
          pull: false,
          push: true,
        },
      })
      await db.contents.sync({
        remote: 'http://localhost:5984',
        direction: {
          pull: false,
          push: true,
        },
      })
    },
    async sync(direction) {
      const db = await dbService.get()
      switch (direction) {
        case 'up':
          this.syncUp(db)
          break
        case 'down':
          this.syncDown(db)
          break
        default:
          break
      }
    },
  },
}
</script>
