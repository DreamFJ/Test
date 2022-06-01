<template>
    <div class="my-model container">
        {{checked}}
        <button @click="fireEvent">click</button>
    </div>
</template>

<script>
export default {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: String
  },
  data () {
    return {
      msg: ''
    }
  },
  methods: {
    fireEvent () {
      this.$emit('change', 4)
    }
  }
}
</script>
