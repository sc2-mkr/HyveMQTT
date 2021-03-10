import mqtt from 'mqtt'
import BrokerConfigModel from '~/models/broker/BrokerConfigModel'

export const state = () => ({
  brokers: [
    new BrokerConfigModel('HiveMQ', 'broker.hivemq.com', 8000, '/mqtt'),
    new BrokerConfigModel('emqx', 'broker.emqx.io', 8083, '/mqtt')
  ],
  messages: []
})

export const getters = {
  getBrokers: (state) => state.brokers,
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
        console.log('Connection succeeded!')
      })
      client.on('error', (error) => {
        console.log('Connection failed', error)
      })
      client.on('message', (topic, message) => {
        // this.receiveNews = this.receiveNews.concat(message)
        console.log(`Received message ${message} from topic ${topic}`)
        commit('addMessage')
      })
    } catch (error) {
      console.log('mqtt.connect error', error)
    }
  }
}
export const mutations = {
  addMessage(state, message) {
    state.messages.push(message)
  }
}
