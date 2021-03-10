<template>
  <v-app-bar clipped-left dense fixed app color="primary" dark>
    <v-app-bar-nav-icon @click="toggleDrawerState()" />
    <v-toolbar-title v-text="title" />
  </v-app-bar>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Appbar',
  data() {
    return {
      title: 'HyveMQTT',
    }
  },
  computed: {
    ...mapGetters({
      getDrawerState: 'layout/getDrawerState',
    }),
    drawerState() {
      return this.getDrawerState
    },
  },
  methods: {
    ...mapMutations({
      setDrawerState: 'layout/setDrawerState',
    }),
    toggleDrawerState() {
      this.setDrawerState(!this.drawerState)
    },
  },
}
</script>

<style scoped></style>
