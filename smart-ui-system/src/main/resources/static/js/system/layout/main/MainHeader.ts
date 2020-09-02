/**
 * header 信息
 * @author shizhongming
 * 2020/8/30 7:46 下午
 */
export default {
	computed: {
		computedBus () {
			return window.busVue
		},
		computedStyle () {
			return {
				padding: '0',
				right: '0',
				position: 'fixed',
				top: '0',
				// @ts-ignore
				width: `calc(100% - ${this.computedBus.sidebar.opened ? '256' : '80'}px)`
			}
		}
	},
	methods: {
		toggle () {
			// @ts-ignore
			this.computedBus.sidebar.opened = !this.computedBus.sidebar.opened
		}
	},
	// language=html
	template: `
	<transition>
			<div class="header-animat">
					<a-layout-header/>
					<a-layout-header
						:class="['ant-pro-fixed-header']"
            :style="computedStyle">
						<div class="header">
              <a-icon class="trigger" :type="computedBus.sidebar.opened ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
						</div>	
					</a-layout-header>
			</div>
	</transition>
	`
}
