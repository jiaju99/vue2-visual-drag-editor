<template>
  <a-modal
    :visible="visible"
    title="保存组件"
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
      <a-form-model-item label="组件名" prop="name">
        <a-input v-model="form.name" placeholder="请输入组件名称" />
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
    visible: Boolean,
  },
  data() {
    return {
      form: { name: '' },
      rules: {
        name: [{ required: true, message: '请输入组件名称', trigger: 'blur' }],
      },
    };
  },
  computed: {
    ...mapState(['componentData']),
  },
  methods: {
    ...mapActions(['saveComponentData']),
    // 关闭
    close() {
      this.$emit('update:visible', false);
    },
    // 保存
    save() {
      this.$refs.form
        .validate()
        .then(() => {
          // 校验成功后的逻辑
          const selfComponent = deepCopy(this.componentData);
          selfComponent.id = generateGuid();
          selfComponent.name = this.form.name;
          this.saveComponentData(selfComponent);
          this.$message.success('保存成功');
          this.$emit('update:visible', false);
        })
        .catch(() => false);
    },
  },
};
</script>
