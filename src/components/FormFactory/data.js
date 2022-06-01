export function generateformRow (componentList, options = {}) {
  const {align = 'ltr', overflow = 'nowrap'} = options
  return {
    align,
    overflow,
    componentList
  }
}
export function generateComponent(componentName, componentProps) {
  return {
    componentName,
    componentProps
  }
}
