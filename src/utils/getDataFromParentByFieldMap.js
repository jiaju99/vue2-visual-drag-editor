// 根据映射从父组件获取所需数据
export default function getDataFromParentByFieldMap(data, fieldsMap) {
  const dataSource = {};
  Object.keys(fieldsMap).forEach(key => {
    if (fieldsMap[key] === '') {
      dataSource[key] = data[key];
    } else {
      dataSource[key] = data[fieldsMap[key]];
    }
  });
  return dataSource;
}
