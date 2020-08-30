declare const Vue: any
/**
 * 消息总线
 * @author shizhongming
 * 2020/8/30 8:03 下午
 */
const initBus = () => {
	return new Vue({
		data: {
			// 侧边栏
			sidebar: {
				opened: true
			}
		}
	})
}


export default initBus