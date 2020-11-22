import RightHeader from './RightHeader'
import ThemeMixins from '../../../mixins/ThemeMixins'

declare const contextPath: string

/**
 *
 * @author shizhongming
 * 2020/11/21 11:03 下午
 */
export default {
	data () {
		return {
			logoSrc: contextPath + 'images/system/index/whiteLogo.png'
		}
	},
	components: {
		RightHeader
	},
	mixins: [
		ThemeMixins
	],
	computed: {
	},
	// language=html
	template: `		
	<nav>
			<div :style="computedLeftHeaderStyle" class="navbar-header">
					<div class="navbar-brand navbar-brand-center site-gridmenu-toggle">
<!--							图标-->
							<img class="header-logo header-logo navbar-brand-logo d-sm-block d-lg-block d-none navbar-logo" :src="logoSrc"/>
							<div class="header-title">
                  <span>HPPS Portal</span>
							</div>
					</div>
			</div>
			<div :style="computedRightHeaderStyle" class="navbar-container container-fluid">
					<RightHeader/>
			</div>
	</nav>	
	`
}