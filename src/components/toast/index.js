import vue from 'vue'
import toast from './toast.vue'
// 组件构造器，构造出一个 vue组件实例
const ToastConstructor = vue.extend(toast)
function showToast ({ text, type, duration = 1000 }) {
  this.toastDom = new ToastConstructor({
    el: document.createElement('div'),
    data () {
      return {
        isShow: true,
        text: text
      }
    }
  })
  // 添加节点
  document.body.appendChild(this.toastDom.$el)
  // 过渡时间
  setTimeout(() => {
    this.toastDom.isShow = false
  }, duration)
}
// 全局注册
function registryToast () {
  vue.prototype.$toast = showToast
}

export default registryToast
