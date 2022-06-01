<template>
  <div>
    <FormFactory
      v-if="configList"
      ref="formRef"
      :formList="configList"
      labelWidth="170px"
    />
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm">重置</el-button>
  </div>
</template>
<script>
import FormFactory from "@/components/VForm";
import {
  generateformGroup,
  generateformRow,
  generateComponent,
} from "@/components/VForm/data";

export default {
    components: {
    FormFactory,
  },
  data() {
    return {
      configList: null,
      numberValidateForm: {
        age: "3",
      },
    };
  },
  created() {
    this.getConfig();
  },
  methods: {
    validateDataType() {
        return (rule, value, callback) => {
            if (value) {
                this.$refs.formRef.clearValidate(['dataType1', 'dataType2'])
            }
            const formData = this.$refs.formRef.getFormData()
            const { dataType1, dataType2 } = formData
            console.log('有啊么', dataType1, dataType2)
            if (!dataType1 && !dataType2) {
                return callback(new Error('请输入数据类型'))
            }
            callback()
        }
    },
    getConfig() {
      const vm = this;
      // 第一组
      const groupList = [
        generateformRow({
          componentList: [
            generateComponent({
              type: "input",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                label: "嘻嘻",
                rules: [
                  {
                    required: true,
                    message: "请输入活动名称",
                    trigger: "blur",
                  },
                  {
                    min: 3,
                    max: 5,
                    message: "长度在 3 到 5 个字符",
                    trigger: "blur",
                  },
                ],
              },
              // 可选，自定义form-item 的label，因为项目中会存在label有提示的情况
              formItemLabelOpt: {
                text: "姓名", // 会覆盖formItemAttrs 里的label属性值
                // 可选
                icon: {
                  class: "el-icon-warning-outline",
                  dangerouslyUseHTMLString: false,
                  tips: "我是替普我开心",
                  trigger: "hover",
                },
                // 可选
                textRight: ": ",
              },
              attrs: {
                key: "name",
                value: "123",
              },
              // listeners: {
              //   change(val) {
              //     console.log("change了", val, vm.configList);
              //   },
              // },
            }),
            generateComponent({
              type: "input",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                //   key: "name",
                label: "数据项编号:",
              },
              attrs: {
                key: "dataItemNum",
                value: "D00001",
                disabled: true,
              },
            }),
            generateComponent({
              type: "input",
              layout: {
                width: "50%",
                paddingRight: "10px",
              },
              formItemLabelOpt: {
                text: "数据项名称", // 会覆盖formItemAttrs 里的label属性值
                // 可选
                icon: {
                  class: "el-icon-warning-outline",
                  dangerouslyUseHTMLString: true,
                  tips: "我是替普我开心<br/>2放假哦我饥饿风景<br/>啊啊啊啊我i",
                  trigger: "hover",
                },
                // 可选
                textRight: ": ",
              },
              attrs: {
                key: "dataItemNam",
                value: "seque",
              },
            }),
          ],
        }),
        // 第二行
        generateformRow({
          componentList: [
            generateComponent({
              type: "input",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                label: "数据项中文名称:",
                rules: [
                  {
                    required: true,
                    message: "请输入活动名称",
                    trigger: "blur",
                  },
                ],
              },
              attrs: {
                key: "dataItemChnNam",
                value: "顺序",
              },
              // listeners: {
              //   change(val) {
              //     console.log("change了", val, vm.configList);
              //   },
              // },
            }),
            generateComponent({
              type: "select",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                label: "数据项主题:",
              },
              attrs: {
                key: "dataItemTopic",
                value: "01",
                optionValueKey: "code", // 可选，默认 value
                optionLabelKey: "info", // 可选，默认 label
                options: [
                  { code: "01", info: "01-当事人" },
                  { code: "02", info: "02-产品" },
                  { code: "03", info: "03-协议" },
                ],
              },
              getAttrs(Model) {
                //返回一个被合并到当前attrs属性里的对象
                return Model.dataItemType !== "3" ? { disabled: true } : null;
                }
            }),
          ],
        }),
      ];

      // 第二组
      const groupList2 = [
        generateformRow({
          componentList: [
            generateComponent({
              type: "input",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                label: "数据类型1:",
                rules: [
                  { validator: this.validateDataType(), trigger: 'blur' },
                ],
              },
              attrs: {
                key: "dataType1",
                value: "",
              },
            //   setFormItemAttrs(Model) {
            //     //返回一个被合并到当前 formItemAttrs 属性里的对象
            //     const { dataType1, dataType2 } = Model;
            //     if (!dataType1 && !dataType2) {
            //       return {
            //         rules: [
            //           {
            //             required: true,
            //             message: "请输入数据类型",
            //             trigger: "blur",
            //           },
            //         ],
            //       };
            //     } else {
            //       return {
            //         rules: [
            //           {
            //             required: false,
            //             message: "请输入数据类型",
            //             trigger: "blur",
            //           },
            //         ],
            //       };
            //     }
            //   },
              //   getAttrs(Model) {
              //     //返回一个被合并到当前attrs属性里的对象
              //     return Model.age === "22" ? { disabled: true } : null;
              //   }
            }),
            generateComponent({
              type: "input",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                label: "数据类型2:",
                rules: [
                  { validator: this.validateDataType(), trigger: 'blur' },
                ],
              },
              attrs: {
                key: "dataType2",
                value: "",
              },
              //   getAttrs(Model) {
              //     //返回一个被合并到当前attrs属性里的对象
              //     return Model.age === "22" ? { disabled: true } : null;
              //   }
            }),
          ],
        }),
      ];

      // 第三组
      const groupList3 = [
        generateformRow({
          componentList: [
            generateComponent({
              type: "select",
              layout: {
                width: "50%",
                paddingRight: "10px",
                paddingLeft: "0",
              },
              formItemAttrs: {
                label: "数据项类别:",
                rules: [
                  { required: true, message: '请选择数据项类别', trigger: 'change' }
                ],
              },
              attrs: {
                key: "dataItemType",
                value: "1",
                optionValueKey: "code", // 可选，默认 value
                optionLabelKey: "info", // 可选，默认 label
                options: [
                  { code: "1", info: "1-业务类基础数据项" },
                  { code: "2", info: "2-业务类指标数据项" },
                  { code: "3", info: "3-技术类数据项" },
                ],
              },
            }),
          ],
        }),
      ];
      console.log("groupList=====>", [groupList]);
      this.configList = [
        generateformGroup({
          title: "基本信息",
          // collapse: true,
          groupList,
        }),
        generateformGroup({
          title: "技术映射后台属性",
          // collapse: true,
          groupList: groupList2,
        }),
        generateformGroup({
          title: "技术属性",
          // collapse: true,
          groupList: groupList3,
        }),
      ];
    },
    submitForm() {
      this.$refs.formRef.validate((valid) => {
        console.log("验证结果", valid);
        if (valid) {
          const formData = this.$refs.formRef.getFormData();
          console.log("表单值", formData);
        }
      });
    },
    resetForm() {
      this.$refs.formRef.resetFields();
      this.$refs.numberValidateForm.resetFields();
    },
  },
};
</script>
