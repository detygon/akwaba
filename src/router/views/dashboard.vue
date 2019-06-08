<template>
  <div>
    <v-container grid-list-xl fluid>
      <v-layout row wrap>
        <v-flex lg4 sm6 xs12>
          <MiniStatistic
            icon="fa fa-facebook"
            title="100+"
            sub-title="Forms"
            color="indigo"
          >
          </MiniStatistic>
        </v-flex>
        <v-flex lg4 sm6 xs12>
          <MiniStatistic
            icon="fa fa-google"
            title="150+"
            sub-title="Forms completed"
            color="red"
          >
          </MiniStatistic>
        </v-flex>
        <v-flex lg4 sm6 xs12>
          <MiniStatistic
            icon="fa fa-twitter"
            title="200+"
            sub-title="Followers"
            color="light-blue"
          >
          </MiniStatistic>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
import MiniStatistic from '@/components/mini-statistic.vue'

export default {
  components: {
    MiniStatistic,
  },
  data: () => ({}),
  computed: {},
}
</script>
