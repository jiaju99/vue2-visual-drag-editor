// 生成唯一id
export default function generateGuid() {
  return Number(Math.random().toString().substr(3, 3) + Date.now()).toString(36);
}
