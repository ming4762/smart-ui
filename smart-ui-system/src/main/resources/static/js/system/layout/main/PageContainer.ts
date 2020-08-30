/**
 *
 * @author shizhongming
 * 2020/8/30 9:38 下午
 */
export default {
	// language=html
	template: `
	<div class="page-container">
      <iframe
        :class="menu.id === computedActiveMenu.id ? 'active' : ''"
        class="animation-fade page-frame"
        v-for="menu in computedOpenMenuList"
        :src="getMenuPath(menu)"
        :key="menu.id"/>
	</div>
	`
}