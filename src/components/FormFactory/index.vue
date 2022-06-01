<template>
    <div class="form-factory-container">
      <el-row type="flex" class="row-bg" v-for="(config,index) in configList" :key="index">
        <el-col :span="6" v-for="(componentItem,cIndex) in config.componentList" :key="cIndex">
          <component :is="componentItem.componentName" v-bind="componentItem.componentProps" v-model="componentItem.componentProps.value" v-on="componentItem.componentProps"/>
        </el-col>
      </el-row>
    </div>
</template>

<script>
export default {
  props:{
    configList:{
      type:Array,
      required:true,
    }
  },
  data () {
    return {
      msg: 'hello'
    }
  },
  methods:{
    handleChange(){
      console.log('handleChange')
    }
  }
}
</script>
