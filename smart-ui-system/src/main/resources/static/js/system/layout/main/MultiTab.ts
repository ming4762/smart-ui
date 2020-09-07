// @ts-ignore
import Navigation from 'component/navigation/Navigation'

/**
 *
 * @author shizhongming
 * 2020/8/30 8:49 下午
 */
export default {
	components: {
		Navigation
	},
	props: {
		menuList: Array
	},
	data () {
		return {
		}
	},
	computed: {
		// 消息总线
		computedBus () {
			return window.busVue
		},
		/**
		 * 获取激活的菜单
		 */
		computedActiveMenu () {
			// @ts-ignore
			return this.computedBus.activeMenu
		}
	},
	methods: {
		handleRemove (key: string) {
			// @ts-ignore
			this.computedBus.removeMenu(key)
		},
		handleNavChange (key: string) {
			// @ts-ignore
			this.computedBus.addMenu(key)
		},
		/**
		 * 点击下拉菜单触发
		 * @param key
		 */
		handleClickDropdownMenu ({key}: any): void {
			switch (key) {
				case 'location': {
					// 定位当前
					break
				}
				case 'closeAll': {
					// 关闭全部
					// @ts-ignore
					this.computedBus.removeAllMenu()
					break
				}
				case 'closeOther': {
					// 关闭其他
					// @ts-ignore
					this.computedBus.removeAllMenu(false)
					break
				}
			}
		}
	},
	// language=html
	template: `
		<div style="margin-bottom: 0px; margin-left: 0" class="ant-pro-multi-tab">
				<div class="ant-pro-multi-tab-wrapper">
						<Navigation
								:menuList="menuList"
								@remove="handleRemove"
								:value="computedActiveMenu.key"
								@input="handleNavChange">
                <a-menu @click="handleClickDropdownMenu" slot="dropdown-menu">
                    <a-menu-item key="location">定位当前选项卡 </a-menu-item>
                    <a-divider />
                    <a-menu-item key="closeAll">关闭全部选项卡 </a-menu-item>
                    <a-menu-item key="closeOther">关闭其他选项卡 </a-menu-item>
                </a-menu>
						</Navigation>
				</div>
		</div>
	
	`
}
