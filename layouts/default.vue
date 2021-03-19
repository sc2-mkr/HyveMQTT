<template>
  <v-app dark>
    <notifications group="generic">
      <template #body="props">
        <div :class="props.item.type" class="notification d-flex align-center">
          <div class="flex-grow-1" v-html="props.item.text"></div>
          <v-btn icon small color="white" @click="props.close">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
      </template>
    </notifications>
    <Drawer></Drawer>
    <Appbar></Appbar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <Footer></Footer>
  </v-app>
</template>

<script>
import Appbar from '~/components/layout/Appbar'
import Drawer from '~/components/layout/Drawer'
import Footer from '~/components/layout/Footer'

export default {
  name: 'DefaultLayout',
  components: {
    Appbar,
    Drawer,
    Footer
  }
}
</script>

<style lang="scss">
.notification {
  padding: 10px;
  margin: 5px !important;

  font-size: 14px !important;

  color: #ffffff;
  background: #44a4fc;
  border-left: 5px solid #187fe7 !important;

  &.warn {
    background: #ffb648;
    border-left-color: #f48a06 !important;
  }

  &.error {
    background: #e54d42;
    border-left-color: #b82e24 !important;
  }

  &.success {
    background: #68cd86;
    border-left-color: #42a85f !important;
  }
}
</style>
