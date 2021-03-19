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
          <v-btn
            rounded
            color="secondary"
            :loading="connectionStatus === connectionStates.CONNECTING"
            :disabled="connectionStatus === connectionStates.CONNECTING"
            @click="
              connectionStatus === connectionStates.CONNECTED
                ? disconnectToBroker()
                : connectToBroker()
            "
          >
            {{
              connectionStatus === connectionStates.CONNECTED
                ? 'Disconnect'
                : 'Connect'
            }}
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
          <v-tab
            :disabled="connectionStatus !== connectionStates.CONNECTED"
            href="#publish"
          >
            Publish
          </v-tab>
          <v-tab
            :disabled="connectionStatus !== connectionStates.CONNECTED"
            href="#subscribe"
          >
            Subscribe
          </v-tab>
          <v-tab
            :disabled="connectionStatus !== connectionStates.CONNECTED"
            href="#status"
          >
            Broker Status
          </v-tab>

          <v-tab-item
            class="pt-3"
            :disabled="connectionStatus !== connectionStates.CONNECTED"
            value="publish"
          >
            <v-sheet class="grey lighten-4 rounded-lg pa-5">
              <div class="d-flex align-center">
                <v-text-field
                  v-model="tabs.publish.message.topic"
                  rounded
                  filled
                  label="Topic"
                  hide-details
                ></v-text-field>
                <v-checkbox
                  v-model="tabs.publish.message.retain"
                  label="Retain"
                  class="ml-5"
                ></v-checkbox>
                <v-select
                  v-model="tabs.publish.message.qos"
                  :items="tabs.publish.qosItems"
                  style="max-width: 150px"
                  class="ml-5"
                  hide-details
                  rounded
                  filled
                  label="QoS"
                ></v-select>
              </div>

              <v-textarea
                v-model="tabs.publish.message.message"
                class="my-3"
                rounded
                filled
                label="Message"
                hide-details
              ></v-textarea>

              <div class="d-flex justify-end align-center">
                <v-btn rounded color="secondary">Send</v-btn>
              </div>
            </v-sheet>
          </v-tab-item>
          <v-tab-item
            class="pt-3"
            :disabled="connectionStatus !== connectionStates.CONNECTED"
            value="subscribe"
          >
            <v-sheet class="grey lighten-4 rounded-lg pa-5 d-flex align-center">
              Subscribe
            </v-sheet>
          </v-tab-item>
          <v-tab-item
            class="pt-3"
            :disabled="connectionStatus !== connectionStates.CONNECTED"
            value="status"
          >
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
import { connectionStates } from '~/utils/mqtt/Connection'
import MqttMessageModel from '~/models/mqtt/MqttMessageModel'

export default {
  name: 'Dashboard',
  data() {
    return {
      selectedBrokerId: null,
      connectionStates,

      tabs: {
        model: 'publish',
        publish: {
          message: new MqttMessageModel(),

          qosItems: [
            {
              value: 0,
              text: 0
            },
            {
              value: 1,
              text: 1
            },
            {
              value: 2,
              text: 2
            }
          ]
        }
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
    connectionStatus() {
      return this.getConnectionStatus
    }
  },
  watch: {
    connectionStatus: {
      handler(newVal) {
        switch (newVal) {
          case this.connectionStates.CONNECTED:
            this.$notify({
              group: 'generic',
              type: 'success',
              text: 'Connected to the broker'
            })
            break
          case this.connectionStates.DISCONNECTED:
            break
          case this.connectionStates.CONNECTING:
            break
        }
      }
    }
  },
  mounted() {
    if (this.brokers.length > 0) {
      this.selectedBrokerId = this.brokers[0].id
    }
    this.setConnectionStatus(this.connectionStates.DISCONNECTED)
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
    },
    disconnectToBroker() {}
  }
}
</script>
