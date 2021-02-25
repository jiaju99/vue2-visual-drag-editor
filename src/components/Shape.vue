<template>
  <div
    class="shape"
    :class="{ active: active }"
    @click="selectCurComponent"
    @mousedown="handleMouseDownOnShape"
  >
    <div
      v-for="(item, index) in active ? pointList : []"
      :key="index"
      class="shape-point"
      :style="getPointStyle(item, index)"
      @mousedown="handleMouseDownOnPoint(item, $event)"
    ></div>
    <slot></slot>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import eventBus from '@/utils/eventBus';

export default {
  name: 'Shape',
  props: {
    active: {
      type: Boolean,
      default: false,
    },
    element: {
      require: true,
      type: Object,
    },
    defaultStyle: {
      require: true,
      type: Object,
    },
    index: {
      require: true,
      type: [Number, String],
    },
  },
  data() {
    return {
      pointList: ['lt', 't', 'rt', 'r', 'rb', 'b', 'lb', 'l'], // 八个方向
      cursors: [
        'nw-resize',
        'n-resize',
        'ne-resize',
        'e-resize',
        'se-resize',
        's-resize',
        'sw-resize',
        'w-resize',
      ], // 八个方向的cursor
    };
  },
  methods: {
    ...mapMutations(['setCurComponent', 'setShapeStyle', 'addSnapshot', 'hideContentMenu']),
    // 选中容器
    selectCurComponent(e) {
      // 阻止向父组件冒泡
      e.stopPropagation();
      e.preventDefault();
      // 取消右键菜单
      this.hideContentMenu();
    },
    // 按下容器
    handleMouseDownOnShape(e) {
      e.preventDefault();
      e.stopPropagation();
      // 设置当前选中的元素
      this.setCurComponent({ component: this.element, index: this.index });

      const style = { ...this.defaultStyle };
      const startY = e.clientY;
      const startX = e.clientX;
      // 如果直接修改属性，值的类型会变为字符串，所以要转为数值型
      const startTop = Number(style.top);
      const startLeft = Number(style.left);

      // 如果元素没有移动，则不保存快照
      let hasMove = false;
      const move = e => {
        hasMove = true;
        const curX = e.clientX;
        const curY = e.clientY;
        style.top = curY - startY + startTop;
        style.left = curX - startX + startLeft;

        // 修改当前组件样式
        this.setShapeStyle(style);
        // 等更新完当前组件的样式并绘制到屏幕后再判断是否需要吸附
        // 如果不使用 $nextTick，吸附后将无法移动
        this.$nextTick(() => {
          // 触发元素移动事件，用于显示标线、吸附功能
          // 后面两个参数代表鼠标移动方向
          // curY - startY > 0 true 表示向下移动 false 表示向上移动
          // curX - startX > 0 true 表示向右移动 false 表示向左移动
          eventBus.$emit('elMove', curY - startY > 0, curX - startX > 0);
        });
      };

      const up = () => {
        // 触发元素停止移动事件，用于隐藏标线
        if (hasMove) this.addSnapshot();
        eventBus.$emit('elUnMove');
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    // 按下原点
    handleMouseDownOnPoint(point, e) {
      e.preventDefault();
      e.stopPropagation();

      const style = { ...this.defaultStyle };
      const height = Number(style.height);
      const width = Number(style.width);
      const top = Number(style.top);
      const left = Number(style.left);
      const startX = e.clientX;
      const startY = e.clientY;

      // 鼠标移动事件
      // 如果元素没有移动，则不保存快照
      let hasMove = false;
      const move = e => {
        hasMove = true;
        const curX = e.clientX;
        const curY = e.clientY;
        const disX = curX - startX;
        const disY = curY - startY;

        const hasT = /t/.test(point);
        const hasB = /b/.test(point);
        const hasL = /l/.test(point);
        const hasR = /r/.test(point);
        const newHeight = height + (hasT ? -disY : hasB ? disY : 0);
        const newWidth = width + (hasL ? -disX : hasR ? disX : 0);
        style.height = newHeight > 0 ? newHeight : 0;
        style.width = newWidth > 0 ? newWidth : 0;
        style.left = left + (hasL ? disX : 0);
        style.top = top + (hasT ? disY : 0);
        this.setShapeStyle(style);
      };
      // 鼠标放开事件
      const up = () => {
        if (hasMove) this.addSnapshot();
        document.removeEventListener('mousemove', move);
        document.removeEventListener('mouseup', up);
      };

      document.addEventListener('mousemove', move);
      document.addEventListener('mouseup', up);
    },
    // 设置原点位置
    getPointStyle(point, index) {
      const { width, height } = this.defaultStyle;
      const hasT = /t/.test(point);
      const hasB = /b/.test(point);
      const hasL = /l/.test(point);
      const hasR = /r/.test(point);
      let left = 0;
      let top = 0;

      // 四个角的点
      if (point.length === 2) {
        left = hasL ? 0 : width;
        top = hasT ? 0 : height;
      } else {
        // 上下两点的点，宽度居中
        if (hasT || hasB) {
          left = width / 2;
          top = hasT ? 0 : height;
        }

        // 左右两边的点，高度居中
        if (hasL || hasR) {
          left = hasL ? 0 : width;
          top = Math.floor(height / 2);
        }
      }

      const style = {
        marginLeft: hasR ? '-4px' : '-4px',
        marginTop: '-4px',
        left: `${left}px`,
        top: `${top}px`,
        cursor: this.cursors[index],
      };

      return style;
    },
  },
};
</script>

<style lang="less" scoped>
.shape {
  position: absolute;
  &:hover {
    cursor: move;
  }
}
.active {
  outline: 1px solid #70c0ff;
  user-select: none;
}
.shape-point {
  position: absolute;
  background: #fff;
  border: 1px solid #59c7f9;
  width: 8px;
  height: 8px;
  border-radius: 50%;
}
</style>
