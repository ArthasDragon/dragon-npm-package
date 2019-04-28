<template >
  <div>
    <hello-world/>
    <router-view/>
  </div>
</template>

<script>
import HelloWorld from '@/components/HelloWorld'
export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data () {
    return {
      showDown: false
    }
  },
  methods: {}
}
</script>

<style lang="scss">

</style>
