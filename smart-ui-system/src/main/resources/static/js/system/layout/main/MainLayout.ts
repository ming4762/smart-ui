import MainHeader from 'system/layout/main/MainHeader'
import MultiTab from 'system/layout/main/MultiTab'
import PageContainer from 'system/layout/main/PageContainer'
/**
 * 主体部分
 * @author shizhongming
 * 2020/8/30 7:43 下午
 */

export default {
	components: {
		MainHeader,
		MultiTab,
		PageContainer
	},
	data () {
		return {
			fixedHeader: true
		}
	},
	computed: {
		// 消息总线
		computedBus () {
			return window.busVue
		}
	},
	// language=html
	template: `
		<a-layout>
				<!--		头部		-->
				<MainHeader/>
				<!--		主体		-->
				<a-layout-content :style="{  margin: '24px 15px 0', paddingTop: fixedHeader ? '0' : '0' }">
						<MultiTab/>
						<PageContainer
							:activeMenu="computedBus.activeMenu"
							:openMenuList="computedBus.openMenuList"/>
				</a-layout-content>
		</a-layout>
	`
}

