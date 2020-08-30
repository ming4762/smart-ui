import MainHeader from 'system/layout/main/MainHeader'
import MultiTab from 'system/layout/main//MultiTab'
/**
 * 主体部分
 * @author shizhongming
 * 2020/8/30 7:43 下午
 */

export default {
	components: {
		MainHeader,
		MultiTab
	},
	data () {
		return {
			fixedHeader: true
		}
	},
	// language=html
	template: `
		<a-layout>
				<!--		头部		-->
				<MainHeader/>
				<!--		主体		-->
				<a-layout-content :style="{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '0' : '0' }">
						<MultiTab/>
				</a-layout-content>
		</a-layout>
	`
}

