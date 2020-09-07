/**
 *
 * @author shizhongming
 * 2020/8/30 9:38 下午
 */
export default {
	props: {
		openMenuList: {
			type: Array,
			required: true
		},
		activeMenu: {
			type: Object,
			required: true
		}
	},
	watch: {
	},
	methods: {
		/**
		 * 获取菜单路径
		 * @param menu 菜单信息
		 */
		getMenuPath (menu: any): string {
			return  menu.path
		}
	},
	// language=html
	template: `
	<div class="page-container">
      <iframe
        :class="menu.key === activeMenu.key ? 'active' : ''"
        class="animation-fade page-frame"
        v-for="menu in openMenuList"
        :src="getMenuPath(menu)"
        :key="menu.key"/>
	</div>
	`
}
