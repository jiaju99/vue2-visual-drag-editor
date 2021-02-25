<template>
  <div
    ref="editor"
    class="editor"
    :class="{ edit: isEdit }"
    :style="{
      width: componentData.style.width + 'px',
      height: componentData.style.height + 'px',
    }"
    @contextmenu="handleContentMenu"
  >
    <!-- 页面组件列表展示 -->
    <Shape
      v-for="(item, index) in componentData.config"
      :key="item.id"
      :default-style="item.style"
      :style="getShapeStyle(item.style)"
      :active="item === curComponent"
      :element="item"
      :index="index"
    >
      <component
        :is="item.comName"
        class="component"
        :style="getComponentStyle(item.style)"
        :data-source="getDataFromParentByFieldMap(componentData.dataSource, item.fieldsMap)"
        :element="item"
      />
    </Shape>
    <!-- 右击菜单 -->
    <ContentMenu />
    <!-- 标线 -->
    <MarkLine />
  </div>
</template>

<script>
import Shape from './Shape';
import TimeLine from '@/components/basic/TimeLine';
import Process from '@/components/basic/Process';
import ProcessControl from '@/components/interfaceTemplate/ProcessControl';
import { mapMutations, mapState } from 'vuex';
import getStyle from '@/utils/style';
import getDataFromParentByFieldMap from '@/utils/getDataFromParentByFieldMap';
import ContentMenu from './ContentMenu';
import MarkLine from './MarkLine';

export default {
  name: 'Edit',
  components: {
    Shape,
    TimeLine,
    Process,
    ContentMenu,
    MarkLine,
    ProcessControl,
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true,
    },
  },
  computed: {
    ...mapState(['componentData', 'componentData', 'curComponent']),
  },
  mounted() {
    window.addEventListener('copy', this.copy);
    window.addEventListener('paste', this.paste);
    window.addEventListener('cut', this.cut);
    window.addEventListener('keyup', this.del);
    this.$once('hook:beforeDestroy', function () {
      window.removeEventListener('copy', this.copy);
      window.removeEventListener('paste', this.paste);
      window.removeEventListener('cut', this.cut);
      window.removeEventListener('keyup', this.del);
    });
  },
  methods: {
    getDataFromParentByFieldMap,
    ...mapMutations([
      'showContentMenu',
      'copyComponent',
      'pasteComponent',
      'cutComponent',
      'deleteComponent',
    ]),
    // 组件复制
    copy(e) {
      e.preventDefault();
      this.copyComponent();
    },
    paste(e) {
      e.preventDefault();
      this.pasteComponent();
    },
    cut(e) {
      e.preventDefault();
      this.cutComponent();
    },
    del(e) {
      e.preventDefault();
      if (e.keyCode === 8 || e.keyCode === 46) this.deleteComponent();
    },
    // 鼠标右键菜单
    handleContentMenu(e) {
      e.stopPropagation();
      e.preventDefault();

      // 设置菜单显示位置
      let left = e.clientX;
      let top = e.clientY;
      let editorRectInfo = this.$refs.editor.getBoundingClientRect();
      left -= editorRectInfo.left;
      top -= editorRectInfo.top;
      this.showContentMenu({ left, top });
    },
    getShapeStyle(style) {
      const result = {};
      ['width', 'height', 'top', 'left', 'rotate'].forEach(attr => {
        if (attr !== 'rotate') {
          result[attr] = style[attr] + 'px';
        } else {
          result.transform = 'rotate(' + style[attr] + 'deg)';
        }
      });

      return result;
    },

    getComponentStyle(style) {
      return getStyle(style, ['top', 'left', 'width', 'height', 'rotate']);
    },
  },
};
</script>

<style lang="less" scoped>
.editor {
  position: relative;
  background: #fff;
  flex-shrink: 0;
}
.edit {
  .component {
    outline: none;
    width: 100%;
    height: 100%;
  }
}
</style>
