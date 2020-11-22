import ThemeMixins from '../../../mixins/ThemeMixins'

/**
 * 顶部导航栏
 * @author shizhongming
 * 2020/11/22 4:33 下午
 */
export default {
	mixins: [
		ThemeMixins
	],
	data () {
		return {
			show: false
		}
	},
	computed: {
		/**
		 * 打开的菜单
		 */
		computedOpenMenuList () {
			return [
				{
					title: '首页',
					key: 'ceshi',
					herf: 'https://www.baidu.com'
				}
			].concat(this.computedBus.openMenuList)
		},
		/**
		 * tab list计算属性
		 */
		computedTabListStyle () {
			// 每个菜单长度105
			return {
				width: (this.computedOpenMenuList.length * 105) + 'px'
			}
		},
		computedRightButtonStyle () {
			return {
				height: (this.computedTheme.tabsHeight - 1) + 'px'
			}
		}
	},
	methods: {
		/**
		 * 点击菜单触发
		 * @param key
		 */
		handleClickMenu ({ key }) {
			// todo：开发中
			console.log(key)
		},
		/**
		 * 关闭菜单
		 * @param key
		 * @param event 原生事件
		 */
		handleCloseMenu (key, event) {
			this.computedBus.removeMenu(key)
			// 停止时间传递
			event.stopPropagation()
		},
		/**
		 * 点击菜单
		 * @param key
		 */
		handleClick ({key}) {
			this.computedBus.addMenu(key)
		}
	},
	// language=html
	template: `
	<nav>
			<div :style="computedTabsHeight" class="contabs-scroll float-left">
					<ul class="nav con-tabs" :style="computedTabListStyle">
							<li
									:key="menu.key"
									:class="menu.key === computedBus.activeMenu.key ? ['active'] : []"
									v-for="(menu, i) in computedOpenMenuList">
									<!--				TODO: 样式写死 应该根据	tabsHeight动态调整				-->
									<a style="line-height: 30px; height: 30px" href="javascript:;" @click="handleClick(menu)" :title="menu.title">
											<span>{{menu.title}}</span>
											<i @click="handleCloseMenu(menu.key, $event)" v-if="i !== 0" style="top: 9px" class="icon wb-close-mini"/>
									</a>
							</li>
					</ul>
			</div>
			<div :class="show ? ['show'] : []" class="btn-group float-right">
					<a-dropdown v-model="show" :trigger="['click']">
              <button :style="computedRightButtonStyle" type="button" class="btn btn-default dropdown-toggle btn-outline"/>
              <a-menu @click="handleClickMenu" slot="overlay">
                  <a-menu-item key="refresh">
<!--                      <a-icon :style="{'font-size': '14px'}" type="inbox" />-->
                      <span>刷新当前</span>
                  </a-menu-item>
                  <a-menu-item key="close-current">
                      <span>关闭其他</span>
                  </a-menu-item>
                  <a-menu-item key="close-all">
                      <span>关闭所有</span>
                  </a-menu-item>
              </a-menu>
					</a-dropdown>
			</div>
	</nav>	
	`
}