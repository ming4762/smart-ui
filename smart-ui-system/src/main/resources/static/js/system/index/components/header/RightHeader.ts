import TopMenuList from './TopMenuList'
import TopOperation from './TopOperation'
/**
 * 顶部右侧菜单
 * @author shizhongming
 * 2020/11/21 11:33 下午
 */
export default {
	components: {
		TopMenuList,
		TopOperation
	},
	// language=html
	template: `
	<div class="collapse navbar-collapse navbar-collapse-toolbar">
			<TopMenuList class="nav navbar-toolbar navbar-left"/>
			<TopOperation class="nav navbar-toolbar navbar-right navbar-toolbar-right"/>
	</div>	
	`
}