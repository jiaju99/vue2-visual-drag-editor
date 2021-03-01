import Vue from 'vue';
import Vuex from 'vuex';
import { deepCopy } from '@/utils/utils';
import { saveSelfComponent } from '@/api/selfComponentDesign';
import generateGuid from '@/utils/generateGuid';
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    // 自定义模板列表
    templateList: [],
    // 自定义组件列表
    componentList: [],
    hour: 16,
    // ---------------------------------------------
    // 画布大小
    // canvasStyleData: {
    //   width: 1920,
    //   height: 1080
    // },
    // 自定义组件数据
    componentData: {
      id: '',
      name: '',
      style: {
        width: 1396,
        height: 660,
        backgroundColor: '#fff',
      },
      fieldsMap: {},
      dataSource: {
        status: 0,
        startTime: '2021-02-02 14:31:00',
        endTime: '2021-02-03 14:31:00',
      },
      config: [],
    },
    // 当前选中组件
    curComponent: null,
    curComponentIndex: undefined,
    // 右键菜单
    menuShow: false,
    menuLeft: undefined,
    menuTop: undefined,
    // 复制数据
    copyData: null,
    // 右键操作
    menuMode: undefined,
    // 快照
    snapshotData: [],
    snapshotIndex: -1,
  },
  mutations: {
    addTemplate(state, payload) {
      const tmp = JSON.parse(JSON.stringify(payload));
      tmp.id = state.templateList.length;
      state.templateList.push(tmp);
    },
    updateTemplateById(state, payload) {
      const tmp = JSON.parse(JSON.stringify(payload));
      state.templateList.splice(tmp.key, 1, tmp.value);
    },
    // ---------------------------------------------
    // 清空自定义组件数据
    clearComponentData(state) {
      state.componentData.config = [];
    },
    // 保存自定义组件
    saveComponentData(state, componentData) {
      state.componentList.push(componentData);
    },
    // 添加基础组件
    addComponent(state, { component, index }) {
      if (index !== undefined) {
        state.componentData.config.splice(index, 0, component);
      } else {
        state.componentData.config.push(component);
      }
    },
    // 设置当前选中元素
    setCurComponent(state, { component, index }) {
      state.curComponent = component;
      state.curComponentIndex = index;
    },
    // 设置元素大小
    setShapeStyle({ curComponent }, { top, left, width, height }) {
      if (top) curComponent.style.top = top;
      if (left) curComponent.style.left = left;
      if (width) curComponent.style.width = width;
      if (height) curComponent.style.height = height;
    },
    // 设置当前选中组件信息
    setShapePosStyle({ curComponent }, { key, value }) {
      curComponent.style[key] = value;
    },
    // 显示右键菜单
    showContentMenu(state, { left, top }) {
      state.menuShow = true;
      state.menuLeft = left;
      state.menuTop = top;
    },
    // 关闭右键菜单
    hideContentMenu(state) {
      state.menuShow = false;
    },
    //复制组件
    copyComponent(state) {
      if (!state.curComponent) return;
      state.copyData = {
        component: deepCopy(state.curComponent),
        index: state.curComponentIndex,
      };
      state.menuMode = 'copy';
    },
    // 组件粘贴
    pasteComponent(state, payload) {
      if (!state.copyData) return;
      const data = state.copyData.component;
      data.id = generateGuid();
      if (payload) {
        data.style.top = state.menuTop;
        data.style.left = state.menuLeft;
      } else {
        data.style.top += 10;
        data.style.left += 10;
      }
      store.commit('addComponent', { component: data });
      store.commit('addSnapshot');
      state.menuMode = 'paste';
      state.copyData = null;
    },
    // 组件剪切
    cutComponent(state) {
      if (!state.curComponent) return;
      if (state.copyData && state.menuMode === 'cut') {
        store.commit('addComponent', state.copyData);
      }
      store.commit('copyComponent');
      store.commit('deleteComponent');
      state.menuMode = 'cut';
    },
    //删除组件
    deleteComponent(state) {
      if (!state.curComponent) return;
      state.componentData.config.splice(state.curComponentIndex, 1);
      store.commit('addSnapshot');
      state.menuMode = 'delete';
    },
    // 撤销
    undoSnapshot(state) {
      if (state.snapshotIndex >= 0) {
        state.snapshotIndex--;
        store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]));
      }
    },
    // 恢复
    restoreSnapshot(state) {
      if (state.snapshotIndex < state.snapshotData.length - 1) {
        state.snapshotIndex++;
        store.commit('setComponentData', deepCopy(state.snapshotData[state.snapshotIndex]));
      }
    },
    // 设置画板保存的组件配置
    setComponentData(state, payload = []) {
      state.componentData.config = payload;
      // Vue.set(state.componentData, 'config', payload)
    },
    // 添加新的快照
    addSnapshot(state) {
      state.snapshotData[++state.snapshotIndex] = deepCopy(state.componentData.config);
      if (state.snapshotIndex < state.snapshotData.index - 1) {
        state.snapshotData = state.snapshotData.slice(0, state.snapshotIndex);
      }
    },
  },
  actions: {
    async saveComponentData({ commit }, componentData) {
      await saveSelfComponent(componentData);
      commit('saveComponentData', componentData);
    },
  },
  getters: {
    getTemplateNameById: state => id => state.templateList[id]?.name ?? '',
    getTemplateById: state => id => state.templateList[id] ?? { name: '', config: [] },
    // ---------------------------------------------
  },
  modules: {},
});

export default store;
