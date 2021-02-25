<template>
  <div
    v-show="menuShow"
    class="contentMenu"
    :style="{ top: menuTop + 'px', left: menuLeft + 'px' }"
  >
    <ul>
      <template v-if="curComponent">
        <li @click="copy">复制</li>
        <li @click="paste">粘贴</li>
        <li @click="cut">剪切</li>
        <li @click="del">删除</li>
      </template>
      <template v-else>
        <li @click="undo">撤销</li>
        <li @click="restore">恢复</li>
        <li @click="paste">粘贴</li>
      </template>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'ContentMenu',
  computed: {
    ...mapState(['menuShow', 'menuTop', 'menuLeft', 'curComponent']),
  },
  methods: {
    ...mapMutations([
      'copyComponent',
      'pasteComponent',
      'cutComponent',
      'deleteComponent',
      'undoSnapshot',
      'restoreSnapshot',
    ]),
    // 复制
    copy() {
      this.copyComponent();
    },
    // 粘贴
    paste() {
      this.pasteComponent(true);
    },
    // 剪切
    cut() {
      this.cutComponent();
    },
    // 删除组件
    del() {
      this.deleteComponent();
    },
    // 撤销
    undo() {
      this.undoSnapshot();
    },
    // 删除
    restore() {
      this.restoreSnapshot();
    },
  },
};
</script>

<style lang="less" scoped>
.contentMenu {
  position: absolute;
  z-index: 99;
  ul {
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    margin: 5px 0;
    padding: 6px 0;

    li {
      font-size: 14px;
      padding: 0 20px;
      position: relative;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      color: #606266;
      height: 34px;
      line-height: 34px;
      box-sizing: border-box;
      cursor: pointer;

      &:hover {
        background-color: #f5f7fa;
      }
    }
  }
}
</style>
