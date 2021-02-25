<template>
  <a-list :split="false" size="small" :data-source="listData" class="card-list-container">
    <a-list-item slot="renderItem" slot-scope="item">
      <a-card :title="item.title" style="width: 100%">
        <a-list :data-source="item.processData">
          <a-list-item slot="renderItem" slot-scope="processItem">
            <div class="process-container">
              <div class="left-area">
                <p>卫星代号：{{ processItem.wxdh }}</p>
                <p>计划编号：{{ processItem.jhbh }}</p>
                <p>任务标识：{{ processItem.rwbs }}</p>
                <a-button size="small" class="cancel-btn" @click="cancelPlan">取消</a-button>
              </div>
              <a-divider type="vertical" class="line-wrap" />
              <div class="content-area">
                <div class="node-wrap">
                  <a-avatar :style="{ backgroundColor: '#87d068' }" size="large" class="node">
                    计划编制
                  </a-avatar>
                </div>
                <NodeArrow />
                <div class="node-wrap">
                  <a-avatar :style="{ backgroundColor: '#f00' }" size="large" class="node">
                    指令编制
                  </a-avatar>
                  <div class="reverse-arrow" @click="backPlan">
                    <NodeArrow reverse :line-width="28" />
                    <div class="back-btn">后退</div>
                  </div>
                </div>
                <NodeArrow />
                <div class="node-wrap">
                  <a-avatar :style="{ backgroundColor: '#00f' }" size="large" class="node">
                    指令发控
                  </a-avatar>
                  <div class="reverse-arrow" @click="backPlan">
                    <NodeArrow reverse :line-width="28" />
                    <div class="back-btn">后退</div>
                  </div>
                </div>
              </div>
              <a-divider type="vertical" class="line-wrap" />
              <div class="right-area">
                <p>观测开始时间：{{ processItem.sj }}</p>
                <p>观测结束时间：{{ processItem.sj }}</p>
                <p>接收开始时间：{{ processItem.sj }}</p>
                <p>接收结束时间：{{ processItem.sj }}</p>
              </div>
            </div>
          </a-list-item>
        </a-list>
      </a-card>
    </a-list-item>
  </a-list>
</template>

<script>
import NodeArrow from './NodeArrow';

export default {
  name: 'MonitorCardList',
  components: {
    NodeArrow,
  },
  props: {
    listData: Array,
  },
  methods: {
    // 取消计划
    cancelPlan() {},
    // 后退计划
    backPlan() {},
  },
};
</script>

<style lang="less" scoped>
.card-list-container {
  /deep/ .ant-card-head {
    min-height: auto;
    padding: 0 12px;
    .ant-card-head-title {
      padding: 2px;
      font-size: 14px;
      flex: none;
    }
  }

  /deep/ .ant-card-body {
    padding: 4px 24px;
  }

  .process-container {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .left-area {
      p {
        margin: 0;
      }
      .cancel-btn {
        margin-left: 55%;
        margin-top: 6%;
        color: #fff;
        background-color: orange;
      }
    }

    .line-wrap {
      height: 7em;
      background-color: #bbb;
    }

    .content-area {
      display: flex;
      align-items: center;
      overflow: auto;
      .node-wrap {
        .node {
          flex-shrink: 0;
          border: solid 1px #000;
        }

        .reverse-arrow {
          position: absolute;
          margin-top: 8px;
          cursor: pointer;
          .back-btn {
            position: absolute;
            font-size: 8px;
            margin-top: -7px;
            margin-left: 12px;
            background-color: #fff;
            border: solid 1px #ccc;
            border-radius: 2px;
          }
        }
      }
    }
    .right-area {
      p {
        margin: 0;
      }
    }
  }
}
</style>
