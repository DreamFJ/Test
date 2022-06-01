<template>
  <div id="example">
    <base-form
      :inline="false"
      :form-items="formItems"
      :merge-form="mergeForm"
      @after-submit="showTableData"
    >
      <template v-slot:slotCheckBox>
        <el-checkbox v-model="mergeForm.slotCheckBox">插槽复选框1</el-checkbox>
      </template>
    </base-form>
  </div>
</template>

<script>
import baseForm from './BaseForm'
import { formItems } from './formItems'

export default {
  name: 'example',
  components: {baseForm},
  filters: {
    format (str) {
      return `处理后的${str}`
    }
  },
  data () {
    return {
      formItems,
      mergeForm: {
        slotCheckBox: ''
      },
      tableData: [],
      showTableHeader: false
    }
  },
  async mounted () {
    await this.getInfo()
  },
  methods: {
    showTableData (res) {
      this.tableData = res.tableData
    },
    findItem (key) {
      return this.formItems.find(
        formItem => formItem.attrs && formItem.attrs.key === key
      )
    },
    async getInfo () {
      // const [res1, res2] = await Promise.all([radioGroup(), cascader()])
      // this.findItem('asyncRadio').attrs.options = res1.options
      // this.findItem('cascader').attrs.options = res2.options
    }
  }
}
</script>

<style scoped>
#example {
  padding: 40px;
}

.icon {
  cursor: pointer;
}

.svg-icon__label {
  margin-right: 15px;
}

.base-table {
  margin-bottom: 25px;
}
</style>
