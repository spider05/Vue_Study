<template>
    <div id="app">
      <Header></Header>
      <div :class="$style.red" >
          ...ddd
        </div>

    </div>
  </template>

<script>

import Header from './layout/header.vue'

export default {

  data () {
    return {
      isRed: true
    }
  },
  mounted () {
    console.log('ClassStyle:  ')
  },

  components: {
    Header
    // Footer,
    // Loading
    // Todo
  },
  computed: {
    appstyle () {
      return 'content_app'
    }
  }

}

</script>

  <style lang="stylus" module>
      .main-header{
        text-align: center;
        font-size: 100px;
        color: blue;
        font-weight: 100;
        margin: 20px;
      }

    .red{
      color:red;
    }

  </style>
