/**
 * header 信息
 * @author shizhongming
 * 2020/8/30 7:46 下午
 */
export default {
	computed: {
		computedBus () {
			return window.busVue
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
					<a-layout-header
            :style="{ padding: '0' }">
						<div class="header">
              <a-icon class="trigger" :type="computedBus.sidebar.opened ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
						</div>	
					</a-layout-header>
			</div>
	</transition>
	`
}