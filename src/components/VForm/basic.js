//所以组件继承自BASIC，建立映射关系
export const basic = {
  input: {
    component: "el-input",
    attrs: {
      placeholder: "请输入",
      clearable: true
    }
  },
  //自定义组件,为了在el-select添加options能够生成el-options节点
  select: {
    component: "base-select",
    attrs: {
      placeholder: "请选择",
      optionValueKey: 'value',
      optionLabelKey: 'label',
      clearable: true
    }
  },
}
