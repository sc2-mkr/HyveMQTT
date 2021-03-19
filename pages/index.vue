<template>
  <div>
    <v-row>
      <v-col cols="12">
        <v-sheet class="grey lighten-5 rounded-lg pa-5 d-flex align-center">
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
      <v-col cols="12">
        <v-tabs
          v-model="tabs.model"
          fixed-tabs
          background-color="primary"
          dark
          class="rounded-lg"
        >
          <v-tab :disabled="!isConnected" href="#publish">Publish</v-tab>
          <v-tab :disabled="!isConnected" href="#subscribe">Subscribe</v-tab>
          <v-tab :disabled="!isConnected" href="#status">Broker Status</v-tab>

          <v-tab-item class="pt-3" :disabled="!isConnected" value="publish">
            <v-sheet class="grey lighten-4 rounded-lg pa-5 d-flex align-center">
              Publish
            </v-sheet>
          </v-tab-item>
          <v-tab-item class="pt-3" :disabled="!isConnected" value="subscribe">
            <v-sheet class="grey lighten-4 rounded-lg pa-5 d-flex align-center">
              Subscribe
            </v-sheet>
          </v-tab-item>
          <v-tab-item class="pt-3" :disabled="!isConnected" value="status">
            <v-sheet class="grey lighten-4 rounded-lg pa-5 d-flex align-center">
              Status
            </v-sheet>
          </v-tab-item>
        </v-tabs>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex'

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
      getBrokers: 'brokers/getBrokers',
      getConnectionStatus: 'brokers/getConnectionStatus'
    }),
    brokers() {
      return this.getBrokers
    },
    isConnected() {
      return this.getConnectionStatus
    }
  },
  mounted() {
    if (this.brokers.length > 0) {
      this.selectedBrokerId = this.brokers[0].id
    }
    this.setConnectionStatus(false)
  },
  methods: {
    ...mapActions({
      connectToBrokerStore: 'brokers/connectToBroker'
    }),
    ...mapMutations({
      setConnectionStatus: 'brokers/setConnectionStatus'
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
