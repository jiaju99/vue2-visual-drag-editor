<template>
  <div class="container">
    <header class="header">
      <Toolbar />
    </header>
    <main>
      <section class="left">
        <ComponentList />
      </section>
      <section class="center">
        <div
          ref="content"
          class="content"
          @drop="handleDrop"
          @dragover="handleDragOver"
          @click="unSelectCurComponent"
        >
          <Editor />
        </div>
      </section>
      <section class="right">我是编辑界面</section>
    </main>
  </div>
</template>

<script>
import Toolbar from '@c/Toolbar';
import ComponentList from '@c/ComponentList.vue';
import componentList from '@/components/componentList.js';
import Editor from '@c/Editor';
import { deepCopy } from '@/utils/utils';
import generateGuid from '@/utils/generateGuid';
import { mapMutations } from 'vuex';

export default {
  name: 'ComponentDesign',
  components: {
    Toolbar,
    ComponentList,
    Editor,
  },
  data() {
    return {};
  },
  methods: {
    ...mapMutations(['addComponent', 'setCurComponent', 'hideContentMenu', 'addSnapshot']),
    // 拖动结束
    handleDrop(e) {
      e.preventDefault();
      e.stopPropagation();
      const component = deepCopy(componentList[e.dataTransfer.getData('index')]);
      const contentRectInfo = this.$refs.content.getBoundingClientRect();
      component.style.left = e.clientX - contentRectInfo.left;
      component.style.top = e.clientY - contentRectInfo.top;
      component.id = generateGuid();
      this.addComponent({ component });
      this.addSnapshot();
    },
    // 持续拖动
    handleDragOver(e) {
      e.preventDefault();
      e.dataTransfer.dropEffect = 'copy';
    },
    // 点击界面空白处
    unSelectCurComponent() {
      this.setCurComponent({ component: null, index: undefined });
      this.hideContentMenu();
    },
  },
};
</script>

<style lang="less" scoped>
.container {
  height: calc(100vh - 140px);
  header {
    text-align: right;
  }
  main {
    height: calc(100vh - 198px);
    border: 1px solid #1f1f1f;
    box-sizing: border-box;
    position: relative;
    .left {
      position: absolute;
      height: 100%;
      width: 200px;
      left: 0;
      top: 0;
      padding: 10px;
      border-right: 1px solid #ccc;
    }
    .right {
      position: absolute;
      height: 100%;
      width: 262px;
      right: 0;
      top: 0;
      border-left: 1px solid #ccc;
    }
    .center {
      margin-left: 200px;
      margin-right: 262px;
      height: 100%;
      overflow: auto;
      padding: 20px;
      .content {
        height: 100%;
        overflow: auto;
        border: 1px solid #ccc;
      }
    }
  }
}
</style>
