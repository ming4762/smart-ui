/**
 * 导航菜单
 * @author shizhongming
 * 2020/9/2 10:08 下午
 */
export default {
	props: {
		menuList: {
			type: Array,
			default: () => ([])
		},
		value: String
	},
	// language=html
	template: `
	<div class="content-tabs">
			<button class="roll-nav roll-left">
          <a-icon type="backward"/>
			</button>
	</div>
	`
}