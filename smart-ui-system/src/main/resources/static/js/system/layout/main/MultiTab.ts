// @ts-ignore
import Navigation from 'component/navigation/Navigation'

/**
 *
 * @author shizhongming
 * 2020/8/30 8:49 下午
 */
export default {
	components: {
		Navigation
	},
	// language=html
	template: `
		<div style="margin-bottom: 15px; margin-left: -15px" class="ant-pro-multi-tab">
				<div class="ant-pro-multi-tab-wrapper">
						<Navigation/>
<!--            <a-tabs-->
<!--              type="editable-card"-->
<!--              :tabBarStyle="{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }"-->
<!--            	hideAdd></a-tabs>-->
				</div>
		</div>
	
	`
}
