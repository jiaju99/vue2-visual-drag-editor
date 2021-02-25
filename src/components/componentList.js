const componentList = [
  {
    id: '',
    name: '时间轴',
    comName: 'TimeLine',
    type: 'relative',
    style: {
      width: 400,
      height: 33,
      backgroundColor: ' #27748b',
    },
    elCss: {
      tickHour: 32,
      tickColor: '#4f9bae',
      tickTextSize: 20,
      tickTextOffset: 48,
      tickTextColor: '#fff',
    },
    event: {},
    fieldsMap: {
      startTime: '',
      endTime: '',
    },
  },
  {
    id: '',
    name: '进度条',
    comName: 'Process',
    type: 'relative',
    style: {
      width: 400,
      height: 16,
    },
    elCss: {
      backgroundColors: ['gray', 'green', 'yellow', 'red', 'blue'],
      logo: '/logo.png',
    },
    event: {},
    fieldsMap: {
      startTime: '',
      endTime: '',
      status: '',
    },
  },
  {
    id: '',
    name: '流程控制',
    comName: 'ProcessControl',
    type: 'relative',
    style: {
      width: 800,
      height: 500,
    },
    event: {},
    fieldsMap: {
      startTime: '',
      endTime: '',
      status: '',
    },
  },
];

export default componentList;
