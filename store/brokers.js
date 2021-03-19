import mqtt from 'mqtt'
import BrokerConfigModel from '~/models/broker/BrokerConfigModel'

export const state = () => ({
  brokers: [
    new BrokerConfigModel('HiveMQ', 'broker.hivemq.com', 8000, '/mqtt'),
    new BrokerConfigModel('emqx', 'broker.emqx.io', 8083, '/mqtt')
  ],
  connected: false,
  messages: []
})

export const getters = {
  getBrokers: (state) => state.brokers,
  getConnectionStatus: (state) => state.connected,
  getMessages: (state) => state.messages
}

export const actions = {
  connectToBroker({ commit }, config) {
    const connectUrl = `${config.useTLS ? 'wss' : 'ws'}://${config.host}:${
      config.port
    }${config.endpoint}`
    try {
      const client = mqtt.connect(connectUrl)
      client.on('connect', () => {
        commit('setConnectionStatus', true)
        // console.log('Connection succeeded!')
      })
      client.on('error', (error) => {
        commit('setConnectionStatus', false)
        // console.log('Connection failed', error)
      })
      client.on('message', (topic, message) => {
        // this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
        commit('addMessage')
      })
    } catch (error) {
      commit('setConnectionStatus', false)
      // console.log('mqtt.connect error', error)
    }
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
