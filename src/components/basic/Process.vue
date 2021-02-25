<template>
  <div ref="box" class="box">
    <div class="process" :style="process">
      <div class="rightLogo">
        <img :src="imgSrc" alt="logo" />
      </div>
    </div>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus';
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'Process',
  inheritAttrs: false,
  props: {
    dataSource: Object,
    element: Object,
  },
  data() {
    return {
      // 进度条宽、高、背景、偏移量
      process: {
        width: undefined,
        height: '50%',
        backgroundColor: undefined,
        left: undefined,
      },
      imgSrc: undefined,
    };
  },
  computed: {
    ...mapState(['hour']),
  },
  watch: {
    type() {
      this.init();
    },
  },
  mounted() {
    this.init();
  },
  methods: {
    /*
      根据开始时间和结束时间计算小时数
      @params: startTime(开始时间)、endTime(结束时间)
      @return: hours(小时数)
    */
    timeToWidth(startTime, endTime) {
      if (!startTime || !endTime) return 0;
      else return moment(endTime).diff(moment(startTime), 'hour');
    },
    // 随时间轴进行移动
    move(diff) {
      this.process.left = Number(this.process.left.replace('px', '')) + diff + 'px';
    },
    init() {
      const box = this.$refs.box;
      const temp =
        (this.timeToWidth(this.dataSource?.startTime, this.dataSource?.endTime) / this.hour) *
        box.offsetWidth;
      // 初始化进度条位置信息
      if (this.type === 'relative') {
        // 监听时间轴移动
        EventBus.$on('move', this.move);
        this.process.left = 0 + 'px';
      } else {
        // 移除时间轴移动
        EventBus.$off('move', this.move);
        this.process.left = box.offsetWidth / 2 - temp + 'px';
      }
      // 初始化进度条宽度信息
      this.process.width = temp + 'px';
      // 初始化高度
      this.process.height = box.offsetHeight - 30 + 'px';
      // 初始化背景颜色
      const backgroundColors = this.element?.elCss?.backgroundColors ?? [
        'gray',
        'green',
        'yellow',
        'red',
        'blue',
      ];
      this.process.backgroundColor = backgroundColors[this.dataSource?.status ?? 0];
      // 初始化图片logo
      this.imgSrc = this.element?.elCss?.logo;
    },
  },
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
  cursor: pointer;
}
.process {
  position: absolute;
  top: 50%;
  box-sizing: border-box;
  border-left: 3px solid #fff;
}
.rightLogo {
  width: 30px;
  height: 30px;
  position: absolute;
  top: -30px;
  right: -30px;
}
.rightLogo img {
  width: 100%;
  height: 100%;
}
</style>
