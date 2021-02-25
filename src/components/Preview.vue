<template>
  <div
    class="canvas"
    :style="{
      width: componentData.style && componentData.style.width + 'px',
      height: componentData.style && componentData.style.height + 'px',
      backgroundColor: componentData.style && componentData.style.backgroundColor,
    }"
  >
    <ComponentProxy v-for="(item, index) in componentData.config" :key="index" :comp="item" />
  </div>
</template>

<script>
import ComponentProxy from './ComponentProxy';

export default {
  name: 'Preview',
  components: {
    ComponentProxy,
  },
  props: {
    componentData: Object,
  },
};
</script>
<style lang="less" scoped>
.canvas {
  position: relative;
  flex-shrink: 0;
}
</style>
