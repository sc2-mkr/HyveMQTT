export const state = () => ({
  drawerState: false
})

export const getters = {
  getDrawerState: (state) => state.drawerState
}

export const actions = {}

export const mutations = {
  setDrawerState(state, drawerState) {
    state.drawerState = drawerState
  }
}
