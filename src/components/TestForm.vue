<template>
  <el-form ref="form" label-width="80px">
    <div v-for="(formItemRow, i) in formList" :key="i">
      <div
        v-for="(formItemCol, j) in formItemRow"
        :key="`${i}${j}${formItemCol.attrs.key || ''}`"
        :width="formItemCol.width"
      >
        <el-form-item :label="formItemCol.itemAttrs.label">
          <el-input v-model="formItemCol.attrs.value"></el-input>
        </el-form-item>
      </div>
    </div>
    <!-- <el-form-item>
      <el-button type="primary" @click="onSubmit">立即创建</el-button>
      <el-button>取消</el-button>
    </el-form-item> -->
</el-form>
</template>

<script>
// import Form from './form'

export default {
  name: 'example',
  // components: { Form }
  data () {
    return {
      formList: [
        [{
          type: 'input',
          width: 400,
          itemAttrs: {
            label: '姓名',
            rules: [{ required: true, message: '姓名不能为空', trigger: 'blur' }]
          },
          attrs: {
            key: 'name',
            value: '1123',
            placeholder: '请输入姓名'
          }
        },
        {
          type: 'input',
          itemAttrs: {
            label: '年龄',
            rules: [{ required: true, message: '年龄不能为空', trigger: 'blur' }]
          },
          attrs: {
            key: 'age',
            value: '1123',
            placeholder: '请输入年龄'
          }
        }]
      ]
    }
  }
}
</script>
