<template>
  <div class="toolbar-wrap">
    <div class="toolbar">
      <div class="canvas-config">
        <span>组件大小</span>
        <a-input v-model="componentData.style.width" class="input" />
        <span>*</span>
        <a-input v-model="componentData.style.height" class="input" />
      </div>
      <a-button-group>
        <a-button @click="clear">清空画布<a-icon type="close" /></a-button>
        <a-button @click="codeView">查看代码<a-icon type="code" /></a-button>
        <a-button @click="preView">预览界面<a-icon type="camera" /></a-button>
        <a-button @click="saveView">保存组件<a-icon type="check" /></a-button>
      </a-button-group>
    </div>
    <CodeView :visible.sync="visibleCode" :code="componentData" />
    <PreviewProxy :visible.sync="visiblePre" />
    <SaveView :visible.sync="visibleSave" />
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import CodeView from './CodeView';
import PreviewProxy from './PreviewProxy';
import SaveView from './SaveView';

export default {
  name: 'Toolbar',
  components: {
    CodeView,
    PreviewProxy,
    SaveView,
  },
  data() {
    return {
      visibleCode: false,
      visiblePre: false,
      visibleSave: false,
    };
  },
  computed: {
    ...mapState(['componentData']),
  },
  methods: {
    ...mapMutations(['clearComponentData']),
    // 清空画布
    clear() {
      this.clearComponentData();
      this.$message.success('清除成功');
    },
    // 查看代码
    codeView() {
      this.visibleCode = true;
    },
    // 预览界面
    preView() {
      this.visiblePre = true;
    },
    // 保存组件
    saveView() {
      this.visibleSave = true;
    },
  },
};
</script>

<style lang="less" scoped>
.toolbar-wrap {
  .toolbar {
    height: 64px;
    line-height: 64px;
    .canvas-config {
      display: inline-block;
      margin-right: 10px;
      font-size: 14px;
      color: #606266;
      .input {
        width: 50px;
        height: 30px;
        margin-left: 10px;
        outline: none;
        padding: 0 5px;
        border: 1px solid #ddd;
        color: #606266;
        text-align: center;
      }
      span {
        margin-left: 10px;
      }
    }

    /deep/ .ant-btn {
      padding: 0 8px;
      & + .ant-btn {
        margin-left: 10px;
      }
      &:last-child {
        margin-right: 10px;
      }
    }
  }
}
</style>
