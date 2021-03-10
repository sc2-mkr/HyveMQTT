<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-sheet class="grey lighten-4 rounded-lg pa-5 d-flex align-center">
          <v-select
            v-model="selectedBrokerId"
            :items="brokers"
            item-text="name"
            item-value="id"
            rounded
            filled
            hide-details
            style="max-width: 420px"
            class="mr-5"
          ></v-select>
          <v-btn rounded color="secondary" @click="connectToBroker()">
            Connect
          </v-btn>
        </v-sheet>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      selectedBrokerId: null,

      tabs: {
        model: 'publish'
      }
    }
  },
  computed: {
    ...mapGetters({
      getBrokers: 'brokers/getBrokers'
    }),
    brokers() {
      return this.getBrokers
    }
  },
  mounted() {
    if (this.brokers.length > 0) {
      this.selectedBrokerId = this.brokers[0].id
    }
  },
  methods: {
    ...mapActions({
      connectToBrokerStore: 'brokers/connectToBroker'
    }),
    connectToBroker() {
      const brokerConfig = this.brokers.find(
        (broker) => broker.id === this.selectedBrokerId
      )
      this.connectToBrokerStore(brokerConfig)
    }
  }
}
</script>
