import SMenu from '../../../layout/menu/SMenu'
import ThemeMixins from '../../../mixins/ThemeMixins'

/**
 *
 * @author shizhongming
 * 2020/11/22 1:07 下午
 */
export default {
	components: {
		SMenu
	},
	mixins: [
		ThemeMixins
	],
	computed: {
		computedBusVue () {
			return window.busVue
		},
		computedUserMenuTree () {
			const activeTopMenu = this.computedBusVue.activeTopMenu
			return activeTopMenu ? activeTopMenu.children : []
		}
	},
	// language=html
	template: `
    <SMenu 
		    :theme="computedTheme.menuTheme"
		    :style="computedSideMenuStyle"
		    style="padding: 16px 0; border-right: none"
		    :menuList="computedUserMenuTree"/>
	`
}