<template>
  <div class="arrow" :style="{ transform: reverse ? 'rotate(180deg)' : '' }">
    <div :style="{ width: `${lineWidth}px` }" class="line"></div>
    <div class="trangle"></div>
  </div>
</template>

<script>
export default {
  name: 'NodeArrow',
  props: {
    reverse: {
      type: Boolean,
      default: false,
    },
    lineWidth: {
      type: Number,
      default: 20,
    },
  },
};
</script>

<style lang="less" scoped>
.arrow {
  display: flex;
  .line {
    height: 1px;
    background-color: #000;
  }
  .trangle {
    width: 8px;
    height: 3px;
    border: solid transparent;
    border-width: 3px 8px;
    border-left-color: #000;
    margin-top: -3px;
    margin-right: -8px;
  }
}
</style>
