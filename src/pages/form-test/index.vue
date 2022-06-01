<template>
    <div>
        <FormFactory v-if="configList" :configList="configList"/>
    </div>
</template>
<script>
import FormFactory from '@/components/FormFactory'
import {generateformRow,generateComponent} from '@/components/FormFactory/data'
import {getData} from './mockData'
export default {
  data () {
    return {
      msg: 'hello',
      configList: null
    }
  },
  created () {
    this.config = this.getConfig()
  },
  methods: {
    getConfig () {
      const data = getData()
      this.configList = [
        generateformRow([
          generateComponent("el-input",{value:"input",change(){
            console.log("helo")
          }}),
        ]),
        generateformRow([
          generateComponent("el-input",{value:"input",change(){
            console.log("helo")
          }}),
          generateComponent("el-input",{value:"input",change(){
            console.log("helo")
          }}),
        ])
      ]
    }
  },
  components: {
    FormFactory
  }
}
</script>
