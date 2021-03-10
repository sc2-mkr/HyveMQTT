<template>
  <v-app dark>
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
