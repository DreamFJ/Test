<template>
  <el-form
    class="tc-form-box"
    :ref="form"
    v-bind="$attrs"
    :model="model"
  >
    <div v-for="(formItemGroup, gIndex) in _formList" :key="gIndex">
      <!-- 分组 -->
      <div v-if="formItemGroup.title" class="tc-form-item-group">
        {{formItemGroup.title}}
        <i v-if="formItemGroup.collapse" class="el-collapse-item__arrow el-icon-arrow-right"></i>
      </div>
      <div
        class="tc-form-item-row-box"
        v-for="(formItemRow, rIndex) in formItemGroup.groupList"
        :key="`${gIndex}${rIndex}`"
      >
        <!-- 分行 -->
        <div
          class="tc-form-item-box"
          v-for="(formItemCol, cIndex) in formItemRow.componentList"
          :key="`${gIndex}${rIndex}${cIndex}${formItemCol.attrs.key || ''}`"
          :style="formItemBoxStyle(formItemCol.layout)"
        >
            <!-- :class="formItemCol.formItemAttrs.className" -->
          <el-form-item
            v-bind="formItemCol.formItemAttrs || {}"
            :prop="formItemCol.attrs.key"
          >
            <!-- 表单的label，考虑到可能会有提示，直接用slot -->
            <span v-if="formItemCol.formItemLabelOpt" slot="label">
              {{formItemCol.formItemLabelOpt.text}}
              <el-tooltip v-if="formItemCol.formItemLabelOpt.icon" placement="top">
                <div slot="content">
                  <p v-if="!formItemCol.formItemLabelOpt.icon.dangerouslyUseHTMLString">{{ formItemCol.formItemLabelOpt.icon.tips }}</p>
                  <p v-else v-html="formItemCol.formItemLabelOpt.icon.tips"></p>
                </div>
                <i :class="formItemCol.formItemLabelOpt.icon.class"></i>
              </el-tooltip>
              {{formItemCol.formItemLabelOpt.textRight}}
            </span>
            <component
              :is="formItemCol.componentName"
              v-model="model[formItemCol.attrs.key]"
              v-bind="formItemCol.attrs || {}"
              v-on="formItemCol.listeners || {}"
            />
          </el-form-item>
        </div>
      </div>
    </div>
  </el-form>
</template>

<script>
import { basic } from "./basic"

const form = Symbol("form") //保证每个表单实例有独一无二的标志位，给ref使用

export default {
  props:{
    value: Object, // 外面用来双向绑定的数据
    formList:Array
  },
  data () {
    return {
      form, // refs
      Model: {},
      originModel: {},
    }
  },
  computed: {
    // 用于双向绑定的数据
    model() {
      return this.value
    },

    //根据 formList 计算出实际需要让页面渲染的数据，会做一些默认处理
    _formList() {
      //this.Model中的值改变触发computed
      let _formList = []
      _formList = this.formList.map(formListItem => {
        const { groupList } = formListItem
        formListItem.groupList = groupList.map(groupItem => {
          const { componentList } = groupItem
          groupItem.componentList = componentList.map(item => this.computeFormItem(item, this.model))
          return groupItem
        })
        return formListItem
      })
      return _formList
    },
  },
  watch: {
    // // 这里不用通过监听model的改变然后触发input事件让外面去更新值，因为绑定的是一个对象值，会直接改了外面的值
    // model: {
    //   handler (val) {
    //     console.log('v-model值改了是什么', val)
    //     this.$emit('input', val)
    //   },
    //   deep: true,
    // },

    // formList: {
    //   handler(val){
    //     for (let i = 0; i < val.length; i++) {
    //       const { groupList } = val[i]
    //       for (let j = 0; j < groupList.length; j++) {
    //         const { componentList } = groupList[j]
    //         for (let k = 0; k < componentList.length; k++) {
    //           const formItem = componentList[k]
    //           // TODO: 考虑插槽
    //           // if (!formItem.attrs || !formItem.attrs.key) return; //跳过没有key的属性(插槽)
    //           const { key, value } = formItem.attrs
    //           this.$set(
    //             this.Model,
    //             key,
    //             value ? value : ''
    //           )
    //         }
    //       }
    //     }
    //     this.originModel = JSON.parse(JSON.stringify(this.Model))
    //     console.log('Model=======>', this.Model)
    //     // console.log('表单改变了！！！', val)
    //   },
    //   deep: true,
    //   immediate: true
    // }
  },
  created () {
    this.originModel = JSON.parse(JSON.stringify(this.value))
  },
  methods:{
    formItemBoxStyle (layout) {
      let ret = {}
      const { width, paddingRight, paddingLeft } = layout
      if (width) {
        ret.width = width
      }
      if (paddingRight) {
        ret.paddingRight = paddingRight
      }
      if (paddingLeft) {
        ret.paddingLeft = paddingLeft
      }
      return ret
    },
    computeFormItem(formItem, model) {
      const item = { ...formItem }
      // 表单控件的类型
      let type = item.type || 'input'
      // 对应到组件映射表
      let basicItem = basic[type]
      item.componentName = basicItem.component
      //继承基类的属性
      item.attrs = Object.assign({}, basicItem.attrs, item.attrs)
      // // 获取动态 formItemAttrs 主要用于动态设置表单校验规则
      // if (item.setFormItemAttrs) {
      //   item.formItemAttrs = Object.assign(item.formItemAttrs, item.setFormItemAttrs(model))
      // }
      // 获取动态 Attributes
      if (item.getAttrs) {
        item.attrs = Object.assign(item.attrs, item.getAttrs(model))
      }
      // // 条件渲染
      // item._ifRender = item.ifRender ? item.ifRender(model) : true;
      // // 防止表单提交时存在多余 key
      // if (!item._ifRender) {
      //   delete model[item.attrs.key];
      // }
      // form-item 配置
      return item
    },
    // 获取表单的model 数据
    getFormData () {
      return this.model
    },
    validate (callback) {
      return this.$refs[form].validate(callback)
    },
    validateField (props, callback) {
      return this.$refs[form].validateField(props, callback)
    },
    resetFields () {
      this.$emit('input', this.originModel)
      this.$refs[form].clearValidate()
    },
    clearValidate (props) {
      return this.$refs[form].clearValidate(props)
    },
  }
}
</script>

<style scoped>
.tc-form-box .el-select {
  width: 100%;
}
.tc-form-item-row-box {
  display: flex;
  flex-wrap: wrap;
}
.tc-form-item-box {
  box-sizing: border-box;
  display: inline-block;
}
.tc-form-item-group {
  font-size: 13px;
  font-weight: 500;
  color: #303133;
  height: 48px;
  line-height: 48px;
}
</style>
