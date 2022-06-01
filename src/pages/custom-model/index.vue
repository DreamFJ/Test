<template>
    <MyModel v-model="checked"/>
</template>

<script>
import MyModel from '@/components/MyModel'
export default {
  data () {
    return {
      checked: 'hello'
    }
  },
  components: {
    MyModel
  }
}
</script>
