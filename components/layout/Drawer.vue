<template>
  <v-navigation-drawer v-model="drawerState" clipped fixed app>
    <v-list>
      <v-list-item
        v-for="(item, i) in items"
        :key="i"
        :to="item.to"
        router
        exact
      >
        <v-list-item-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title v-text="item.title" />
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'Drawer',
  data() {
    return {
      items: [
        {
          icon: 'mdi-view-dashboard',
          title: 'Dashboard',
          to: '/',
        },
      ],
    }
  },
  computed: {
    ...mapGetters({
      getDrawerState: 'layout/getDrawerState',
    }),
    drawerState: {
      get() {
        return this.getDrawerState
      },
      set(state) {
        this.setDrawerState(state)
      },
    },
  },
  methods: {
    ...mapMutations({
      setDrawerState: 'layout/setDrawerState',
    }),
  },
}
</script>

<style scoped></style>
