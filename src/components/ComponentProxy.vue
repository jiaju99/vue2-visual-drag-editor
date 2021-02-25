<template>
  <component
    :is="comp.comName"
    class="component"
    :style="getStyle(comp.style)"
    :data-source="getDataFromParentByFieldMap(componentData.dataSource, comp.fieldsMap)"
    :element="comp"
  />
</template>

<script>
import getStyle from '@/utils/style';
import getDataFromParentByFieldMap from '@/utils/getDataFromParentByFieldMap';
import TimeLine from '@/components/basic/TimeLine';
import Process from '@/components/basic/Process';
import ProcessControl from '@/components/interfaceTemplate/ProcessControl';
import { mapState } from 'vuex';

export default {
  name: 'ComponentProxy',
  components: {
    TimeLine,
    Process,
    ProcessControl,
  },
  props: {
    comp: {
      type: Object,
      default: () => ({}),
    },
  },
  computed: {
    ...mapState(['componentData']),
  },
  methods: {
    getStyle,
    getDataFromParentByFieldMap,
  },
};
</script>

<style lang="less" scoped>
.component {
  position: absolute;
}
</style>
