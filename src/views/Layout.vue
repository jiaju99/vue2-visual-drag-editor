<template>
  <a-layout class="layout">
    <a-layout-header>
      <a-menu
        theme="dark"
        mode="horizontal"
        :style="{ lineHeight: '64px' }"
        :default-selected-keys="['1']"
      >
        <a-menu-item key="1">
          <router-link to="editor">编辑器</router-link>
        </a-menu-item>
        <a-menu-item key="2">
          <router-link to="processLibrary">流程库</router-link>
        </a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content>
      <router-view />
    </a-layout-content>
    <a-layout-footer class="layout-footer">
      前端可视化配置中心 ©️中华通信西安分公司
    </a-layout-footer>
  </a-layout>
</template>

<script>
export default {
  name: 'Main',
};
</script>

<style lang="less" scoped>
.layout {
  height: 100vh;
  &-footer {
    text-align: center;
  }
  /deep/ .ant-layout-footer {
    padding: 12px 50px;
  }
}
</style>
