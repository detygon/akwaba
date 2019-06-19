<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex sm12 xs12>
          <NetworkStatusIndicator :visible="true" />
        </v-flex>
        <v-flex sm12 xs12>
          <v-btn color="primary" @click="sync('up')">
            Sync up
          </v-btn>
          <v-btn color="green" dark @click="sync('down')">
            Sync down
          </v-btn>
          <v-btn color="red" dark @click="clearStorage">
            Drop store
          </v-btn>
        </v-flex>
      </v-layout>
      <v-layout row wrap>
        <v-flex md3 sm6 xs12>
          <MiniStatistic
            :title="countForms.toString()"
            sub-title="# Forms"
            color="blue"
            icon="list"
          />
        </v-flex>
        <v-flex md3 sm6 xs12>
          <MiniStatistic
            :title="countResponses.toString()"
            sub-title="# Responses"
            color="orange"
            icon="edit"
          />
        </v-flex>
        <v-flex md3 sm6 xs12>
          <MiniStatistic
            :title="countAgents.toString()"
            sub-title="# Agents"
            color="indigo"
            icon="person"
          />
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import NetworkStatusIndicator from '@/components/network-status-indicator.vue'
import MiniStatistic from '@/components/mini-statistic.vue'
import dbService, { collections } from '@/service/db-service'
import { dbRemote as remote } from '@/constants'

export default {
  components: {
    NetworkStatusIndicator,
    MiniStatistic,
  },
  data: () => ({
    countForms: 0,
    countResponses: 0,
    countAgents: 0,
    subs: [],
  }),
  async mounted() {
    const db = await dbService.get()
    this.subs.push(
      db.forms
        .find({ name: { $regex: /\w/ } })
        .$.subscribe((data) => (this.countForms = data.length))
    )
    this.subs.push(
      db.responses
        .find({ data: { $regex: /\w/ } })
        .$.subscribe((data) => (this.countResponses = data.length))
    )
  },
  beforeDestroy() {
    this.subs.forEach((sub) => {
      sub.unsubscribe()
    })
  },
  methods: {
    async sync(action) {
      const db = await dbService.get()
      const direction = {
        pull: action === 'down',
        push: action === 'up',
      }

      window.$app.$emit('LOADING', true)

      const syncStates = Object.keys(db.collections).map((collection) => {
        return db[collection].sync({
          remote,
          direction,
          options: {
            live: false,
            retry: false,
          },
        })
      })

      syncStates.forEach((state) => {
        this.subs.push(
          state.error$.subscribe((error) => {
            if (error) {
              window.$app.$emit('LOADING', false)
              window.$app.$emit('NOTIFY_ERROR', 'Synchronization failed.')
            }
          })
        )
        this.subs.push(
          state.complete$.subscribe((complete) => {
            if (complete.ok) {
              window.$app.$emit('LOADING', false)
              window.$app.$emit('NOTIFY_SUCCESS', 'Synchronization completed')
            }
          })
        )
      })
    },
    async clearStorage() {
      const db = await dbService.get()

      window.$app.$emit('LOADING', true)

      const result = Object.keys(db.collections).map((collection) => {
        return db[collection].remove()
      })

      Promise.all(result).then(async () => {
        // Recreate the database collections
        await Promise.all(
          collections.map((collection) => db.collection(collection))
        )
        this.dialog = false
        window.$app.$emit('LOADING', false)
      })
    },
  },
}
</script>
