<template>
  <a-modal
    :visible="visible"
    :width="800"
    title="查看代码"
    ok-text="确定"
    cancel-text="取消"
    @cancel="close"
    @ok="close"
  >
    <pre class="code-wrap">{{ code }}</pre>
  </a-modal>
</template>

<script>
export default {
  name: 'CodeView',
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    code: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="less" scoped>
.code-wrap {
  max-height: 400px;
  overflow-y: auto;
}
</style>
