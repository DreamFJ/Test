<template>
  <el-select :value="value" v-on="$listeners">
    <el-option
      v-for="item in $attrs.options"
      :key="item[$attrs.optionValueKey]"
      :label="item[$attrs.optionLabelKey]"
      :value="item[$attrs.optionValueKey]"
    >
    </el-option>
  </el-select>
</template>
<script>
export default {
  name: "base-select",
  inheritAttrs: false,
  props: {
    value: {
      default: ""
    }
  }
};
</script>
