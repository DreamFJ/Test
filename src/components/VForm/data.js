
export function generateformGroup ({title = '', collapse = false, groupList = []}) {
  return {
    title,
    collapse,
    groupList
  }
}

/**
 * @description 生成表单的每一行
 * @param {*} componentList 
 * @param {*} options 
 * @returns 
 */
export function generateformRow ({align = 'ltr', overflow = 'nowrap', componentList = []}) {
  return {
    align,
    overflow,
    componentList
  }
}

/**
 * @description 生成动态组件的配置项
 * @param {Object} componentProps 动态组件配置项
 * @returns {Object} {attrs: {}, listeners: {}} 动态组件的属性和事件监听
 */
export function generateComponent(componentProps) {
  return componentProps
}
