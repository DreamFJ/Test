<template>
<el-form ref="form" :model="form" label-width="80px">
  <el-form-item v-for="item in formList" :key="item.prop" :label="item.label">
    <el-input v-model="form.name"></el-input>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  props: {
    formItems: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      formList: []
    }
  },
  beforeMount () {
    this.formList = this.formItems
  },
  methods: {
    onSubmit () {
      console.log('submit!')
    }
  }
}
</script>
