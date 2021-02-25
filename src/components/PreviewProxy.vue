<template>
  <div v-if="visible" class="mask">
    <a-button class="close" @click="close">关闭</a-button>
    <div class="container">
      <Preview :component-data="componentData" />
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Preview from './Preview';

export default {
  name: 'PreviewProxy',
  components: {
    Preview,
  },
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapState(['componentData']),
  },
  methods: {
    close() {
      this.$emit('update:visible', false);
    },
  },
};
</script>

<style lang="less" scoped>
.mask {
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  .container {
    width: calc(100% - 120px);
    height: calc(100% - 60px);
    margin-top: 64px;
    overflow: scroll;
  }
  .close {
    position: absolute;
    right: 20px;
    top: 20px;
  }
}
</style>
