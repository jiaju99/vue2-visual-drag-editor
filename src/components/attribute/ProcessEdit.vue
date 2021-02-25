<template>
  <a-tabs type="card">
    <a-tab-pane key="1" tab="样式">
      <a-form :label-col="{ span: 8 }" :wrapper-col="{ span: 16 }" :column="2">
        <a-row>
          <a-col :span="12">
            <a-form-item label="类型">
              <a-switch
                checked-children="相对"
                un-checked-children="绝对"
                default-checked
                @change="changeType"
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row>
          <a-col :span="12">
            <a-form-item label="宽"><a-input /></a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="高"><a-input /></a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-tab-pane>
    <a-tab-pane key="2" tab="数据源"> Content of Tab Pane 2 </a-tab-pane>
    <a-tab-pane key="3" tab="事件"> Content of Tab Pane 3 </a-tab-pane>
  </a-tabs>
</template>

<script>
export default {
  name: 'ProcessEdit',
  data() {
    return {};
  },
  methods: {
    // 改变时间轴类型
    changeType(checked) {
      if (checked) this.$emit('change-attr', 'type', 'relative');
      else this.$emit('change-attr', 'type', 'absolute');
    },
  },
};
</script>
