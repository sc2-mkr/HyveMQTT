import mqtt from 'mqtt'
import BrokerConfigModel from '~/models/broker/BrokerConfigModel'
import { connectionStates } from '~/utils/mqtt/Connection'

let client = null

export const state = () => ({
  brokers: [
    new BrokerConfigModel('HiveMQ', 'broker.mqttdashboard.com', 8000, '/mqtt'),
    new BrokerConfigModel('emqx', 'broker.emqx.io', 8083, '/mqtt')
  ],
  connected: connectionStates.DISCONNECTED,
  messages: []
})

export const getters = {
  getBrokers: (state) => state.brokers,
  getConnectionStatus: (state) => state.connected,
  getMessages: (state) => state.messages
}

export const actions = {
  connectToBroker({ commit }, config) {
    commit('setConnectionStatus', connectionStates.CONNECTING)
    const connectUrl = `${config.useTLS ? 'wss' : 'ws'}://${config.host}${
      config.port && config.port !== '' ? `:${config.port}` : ''
    }${config.endpoint}`
    try {
      client = mqtt.connect(connectUrl)
      client.on('connect', () => {
        commit('setConnectionStatus', connectionStates.CONNECTED)
        // console.log('Connection succeeded!')
      })
      client.on('error', (error) => {
        commit('setConnectionStatus', connectionStates.DISCONNECTED)
        // console.log('Connection failed', error)
      })
      client.on('message', (topic, message) => {
        // this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
        commit('addMessage')
      })
    } catch (error) {
      commit('setConnectionStatus', connectionStates.DISCONNECTED)
      // console.log('mqtt.connect error', error)
    }
  },
  disconnectToBroker({ commit }) {
    client.end()
    commit('setConnectionStatus', connectionStates.DISCONNECTED)
  },
  publishMessage({ _ }, message) {
    client.publish(message.topic, message.message, {
      qos: message.qos,
      retain: message.retain
    })
  }
}
export const mutations = {
  addMessage(state, message) {
    state.messages.push(message)
  },
  setConnectionStatus(state, connected) {
    state.connected = connected
  }
}
