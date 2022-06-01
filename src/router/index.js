import Vue from 'vue'
import Router from 'vue-router'
import TestForm from '@/components/TestForm'
import FormTest from '@/pages/form-test'
import CustomModel from '@/pages/custom-model'
import testForm from '@/pages/testForm'
import TestBaseForm from '@/components/TestBaseForm'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'form-test',
      component: FormTest
    },
    {
      path: '/test',
      name: 'test-form',
      component: TestForm
    },
    {
      path: '/model',
      name: 'test-model',
      component: CustomModel
    },
    {
      path: '/testForm',
      name: 'testForm',
      component: testForm
    },
    {
      path: '/testBaseForm',
      name: 'testBaseForm',
      component: TestBaseForm
    },
  ]
})
