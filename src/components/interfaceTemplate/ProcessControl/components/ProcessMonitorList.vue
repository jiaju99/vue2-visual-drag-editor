<template>
  <section>
    <StatusHeader />
    <div class="card-list-wrap">
      <MonitorCardList :list-data="ListData" />
    </div>
  </section>
</template>

<script>
import StatusHeader from './StatusHeader';
import MonitorCardList from './MonitorCardList';

export default {
  name: 'ProcessMonitorList',
  components: {
    StatusHeader,
    MonitorCardList,
  },
  data() {
    return {
      ListData: [
        {
          title: '型号1',
          processData: [
            { wxdh: '18-1', jhbh: '111', rwbs: '111', sj: '2021-02-02 02:02:02' },
            { wxdh: '18-2', jhbh: '222', rwbs: '222', sj: '2021-02-02 02:02:02' },
          ],
        },
        { title: '型号2', processData: [{ wxdh: '19-1', jhbh: '111', rwbs: '111' }] },
      ],
    };
  },
};
</script>

<style lang="less" scoped>
.card-list-wrap {
  max-height: 200px;
  overflow: auto;
}
</style>
