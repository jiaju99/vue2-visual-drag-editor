<template>
  <div ref="box" class="box">
    <canvas ref="container" :width="width" :height="height" class="container"></canvas>
  </div>
</template>

<script>
import EventBus from '@/utils/eventBus';
import moment from 'moment';
import { mapState } from 'vuex';

export default {
  name: 'TimeLine',
  inheritAttrs: false,
  props: {
    dataSource: Object,
    element: Object,
  },
  data() {
    return {
      // 根元素样式
      // 时间轴宽、高
      width: undefined,
      height: undefined,
      // 每小时的长度
      tickTime: undefined,
      // 鼠标位置
      mouseX: undefined,
      // 时间轴滑动结束的位置
      left: undefined,
    };
  },
  computed: {
    ...mapState(['hour']),
  },
  watch: {
    'element.type'(val) {
      if (val === 'relative') {
        const container = this.$refs.container;
        container.style.left = 0;
        this.width =
          this.timeToWidth(this.dataSource?.startTime, this.dataSource?.endTime) * this.tickTime;
        setTimeout(() => this.init());
      } else if (val === 'absolute') {
        this.width = ((this.hour ?? 16) + 1) * this.tickTime;
        setTimeout(() => this.init());
      }
    },
  },
  mounted() {
    const box = this.$refs.box;
    // 监听box变化
    const resizeObserver = new ResizeObserver(() => {
      const hour = this.hour ?? 16;
      this.tickTime = box.offsetWidth / hour;
      if (this.type === 'relative')
        this.width =
          this.timeToWidth(this.dataSource?.startTime, this.dataSource?.endTime) * this.tickTime;
      else this.width = (hour + 1) * this.tickTime;
      this.height = box.offsetHeight;
      setTimeout(() => {
        this.init();
      });
    });
    resizeObserver.observe(box);
    this.$once('hook:beforeDestory', () => {
      resizeObserver.disconnect();
    });
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
    // 绘制刻度尺
    init() {
      const box = this.$refs.box;
      const container = this.$refs.container;
      if (!box || !container) {
        return;
      }
      const ctx = container.getContext('2d');
      if (this.type === 'relative') {
        this.drawRelativeTimeLine(box, container, ctx);
      } else {
        this.drawAbsoluteTimeLine(box, container, ctx);
      }
    },
    // 绘制相对时间刻度尺
    drawRelativeTimeLine(box, container, ctx) {
      let index = 0;
      const num = container.offsetWidth;
      const tickHour = this.element?.elCss?.tickHour ?? 32;
      const tickTextSize = this.element?.elCss?.tickTextSize ?? 20;
      const tickTextOffset = this.element?.elCss?.tickTextOffset ?? 30;
      for (let i = 0; i <= num; i++) {
        const w = (index * this.tickTime) / 10;
        if (w < num) {
          if (index === 0) {
            // 起始位置刻度
            this.drawTick(ctx, w, tickHour);
            const temp = index / 10;
            const text = temp < 10 ? '0' + temp + ':00' : temp + ':00';
            this.drawText(ctx, w, tickHour + tickTextSize, text);
          } else if (index % 10 === 0 && index !== 0) {
            // 每小时刻度
            this.drawTick(ctx, w, tickHour);
            const temp = index / 10;
            const text = temp < 10 ? '0' + temp + ':00' : temp + ':00';
            this.drawText(ctx, w - tickTextOffset / 2, tickHour + tickTextSize, text);
          } else if (index % 5 === 0 && index % 10 !== 0) {
            // 每半小时刻度
            this.drawTick(ctx, w, tickHour / 2);
          } else {
            // 其余刻度
            this.drawTick(ctx, w, tickHour / 4);
          }
          index++;
        } else if (w === num) {
          this.drawTick(ctx, w, tickHour);
          const temp = index / 10;
          const text = temp < 10 ? '0' + temp + ':00' : temp + ':00';
          this.drawText(ctx, w - tickTextOffset, tickHour + tickTextSize, text);
          index++;
        }
      }
      if (container.offsetWidth > box.offsetWidth) {
        container.style.cursor = 'move';
      }
      // 为刻度尺添加按下、松开、移出事件
      container.addEventListener('mousedown', this.mouseDown);
      container.addEventListener('mouseup', this.mouseUp);
      container.addEventListener('mouseout', this.mouseOut);
      // 为刻度尺移除按下、松开、移出事件
      this.$once('hook:beforeDestory', function () {
        container.removeEventListener('mousedown', this.mouseDown);
        container.removeEventListener('mouseup', this.mouseUp);
        container.removeEventListener('mouseout', this.mouseOut);
      });
    },
    // 绘制绝对时间刻度尺
    drawAbsoluteTimeLine(box, container, ctx) {
      /* const hour = this.dataSource?.endTime?.split(' ')[1]?.split(':')[0] ?? 0;
      const minute = this.dataSource?.endTime?.split(' ')[1]?.split(':')[1] ?? 0;
      const during = this.hour ?? 16;
      const tickHour = this.element?.elCss?.tickHour ?? 32;
      const tickTextSize = this.element?.elCss?.tickTextSize ?? 20;
      const tickTextOffset = this.element?.elCss?.tickTextOffset ?? 30;
      let start = (hour - during / 2) * 10;
      let index = 0;
      const num = container.offsetWidth;
      for (let i = 0; i <= num; i++) {
        const w = (index * this.tickTime) / 10;
        if (w < num) {
          if (index === 0) {
            // 绘制起始刻度
            this.drawTick(ctx, w, tickHour);
            const temp = (start + index) / 10;
            let text = undefined;
            if (temp < 0) {
              text = temp + 24 + ':00';
            } else if (temp < 10) {
              text = '0' + temp + ':00';
            } else {
              text = temp + ':00';
            }
            this.drawText(ctx, w, tickHour + tickTextSize, text);
          } else if (index % 10 === 0 && index !== 0) {
            // 每小时刻度
            this.drawTick(ctx, w, tickHour);
            const temp = (start + index) / 10;
            let text = undefined;
            if (temp < 0) {
              text = temp + 24 + ':00';
            } else if (temp < 10) {
              text = '0' + temp + ':00';
            } else {
              text = temp + ':00';
            }
            this.drawText(ctx, w - tickTextOffset / 2, tickHour + tickTextSize, text);
          } else if (index % 5 === 0 && index % 10 !== 0) {
            // 每半小时刻度
            this.drawTick(ctx, w, tickHour / 2);
          } else {
            // 其余刻度
            this.drawTick(ctx, w, tickHour / 4);
          }
          index++;
        } else if (w === num) {
          this.drawTick(ctx, w, tickHour);
          const temp = (start + index) / 10;
          let text = undefined;
          if (temp < 0) {
            text = temp + 24 + ':00';
          } else if (temp < 10) {
            text = '0' + temp + ':00';
          } else {
            text = temp + ':00';
          }
          this.drawText(ctx, w - tickTextOffset, tickHour + tickTextSize, text);
          index++;
        }
      }
      const diff = box.offsetWidth * (minute / during / 60);
      container.style.left = -diff + 'px';

      // 为刻度尺移除按下、松开、移出事件
      container.removeEventListener('mousedown', this.mouseDown);
      container.removeEventListener('mouseup', this.mouseUp);
      container.removeEventListener('mouseout', this.mouseOut); */
    },
    // 绘制刻度
    drawTick(ctx, x, h) {
      ctx.beginPath();
      ctx.strokeStyle = this.element?.elCss?.tickColor ?? '#4f9bae';
      ctx.moveTo(x, 0);
      ctx.lineTo(x, h);
      ctx.stroke();
      ctx.closePath();
    },
    // 绘制文本
    drawText(ctx, x, y, text) {
      ctx.beginPath();
      ctx.font = (this.element?.elCss?.tickTextSize ?? 20) + 'px Arial';
      ctx.fillStyle = this.tickTextColor;
      ctx.fillText(text, x, y);
      ctx.closePath();
    },
    // 鼠标按下事件
    mouseDown(e) {
      const container = this.$refs.container;
      this.mouseX = e.offsetX;
      this.left = Number(container.style.left.replace('px', ''));
      container.addEventListener('mousemove', this.mouseMove);
    },
    // 鼠标松开事件
    mouseUp() {
      const container = this.$refs.container;
      container.removeEventListener('mousemove', this.mouseMove);
    },
    // 鼠标移出事件
    mouseOut() {
      const container = this.$refs.container;
      container.removeEventListener('mousemove', this.mouseMove);
    },
    // 鼠标移动事件
    mouseMove(e) {
      const box = this.$refs.box;
      const container = this.$refs.container;
      let diff = e.offsetX - this.mouseX;
      let nowLeft = this.left + diff;
      if (nowLeft > 0) {
        nowLeft = 0;
        diff = nowLeft - this.left;
      }
      if (-nowLeft > container.offsetWidth - box.offsetWidth) {
        nowLeft = -(container.offsetWidth - box.offsetWidth);
        diff = nowLeft - this.left;
      }
      container.style.left = nowLeft + 'px';
      this.left = nowLeft;
      EventBus.$emit('move', diff);
    },
  },
};
</script>

<style scoped>
.box {
  box-sizing: border-box;
  position: absolute;
  overflow: hidden;
}
.container {
  position: absolute;
  left: 0;
}
</style>
