<template>
  <a-modal
    :visible="visible"
    :title="type === 'component' ? '组件保存' : '模板保存'"
    width="50%"
    centered
    ok-text="保存"
    cancel-text="关闭"
    @cancel="close"
    @ok="save"
  >
    <a-form-model
      ref="form"
      :model="form"
      :label-col="{ span: 4 }"
      :wrapper-col="{ span: 20 }"
      :rules="rules"
    >
      <a-form-model-item :label="type === 'component' ? '组件名' : '模板名'" prop="name">
        <a-input
          v-model="form.name"
          :placeholder="'请输入' + (type === 'component' ? '组件名' : '模板名')"
        />
      </a-form-model-item>
    </a-form-model>
  </a-modal>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import { deepCopy } from '@/utils/utils';
import generateGuid from '@/utils/generateGuid';

export default {
  name: 'SaveView',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    type: {
      type: String,
      default: 'component',
    },
  },
  data() {
    return {
      form: { name: '' },
      rules: {
        name: [{ required: true, message: '请输入名称', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState(['componentData']),
  },
  methods: {
    ...mapActions(['saveComponentData']),
    close() {
      this.$emit('update:visible', false);
    },
    save() {
      this.$refs.form
        .validate()
        .then(async () => {
          try {
            if (this.type === 'component') {
              const selfComponent = deepCopy(this.componentData);
              selfComponent.id = generateGuid();
              selfComponent.name = this.form.name;
              this.saveComponentData(selfComponent);
              this.$message.success('保存成功');
            } else {
              // todo: 模板保存
            }
          } catch {
            this.$message.error('保存失败');
          } finally {
            this.$emit('update:visible', false);
          }
        })
        .catch(err => {
          // console.log(err);
        });
    },
  },
};
</script>
