/**
 *
 * @author shizhongming
 * 2020/11/22 6:42 下午
 */
export default {
	computed: {
		computedOpenMenuList () {
			return this.computedBus.openMenuList
		},
		computedBus () {
			return window.busVue
		}
	},
	// language=html
	template: `
	<div>
			<iframe
				v-for="menu in computedOpenMenuList"
				class="page-frame animation-fade"
				style="height: 100%"
				frameborder="0"
				:class="menu.key === computedBus.activeMenu.key ? ['active'] : []"
				:src="menu.path"
				:key="menu.key"></iframe>
	</div>
	`
}