// @ts-ignore
import CommonUtils from 'js/common/utils/CommonUtils'
import ApiOperation from '../../utils/ApiOperation'


/**
 * 操作区
 */
const Operation = {
	data () {
		return {
			fullscreen: false
		}
	},
	methods: {
		handleFullscreen () {
			CommonUtils.fullScreen(!this.fullscreen)
			this.fullscreen = !this.fullscreen
		},
		/**
		 * 跳转到个人中心
		 */
		handleMenuClick ({ key }) {
			switch (key) {
				case 'logout':
					this.$confirm({
						title: '确定要退出登录吗？',
						onOk() {
							ApiOperation.logout()
						}
					})
					break
			}
		},
	},
	// language=html
	template: `
	<ul class="navbar-top-links">
      <a-tooltip :title="fullscreen ? '退出全屏' : '全屏'">
				<li @click="handleFullscreen">
	          <a-icon class="size" :type="fullscreen ? 'fullscreen-exit' : 'fullscreen'" />
				</li>
      </a-tooltip>
      <li>
		      <a-dropdown>
              <a-avatar size="small" class="size" style="background-color:#87d068; " icon="user" />
              <a-menu slot="overlay" @click="handleMenuClick">
                  <a-menu-item key="user">
		                  <a-icon type="user" />个人中心 
                  </a-menu-item>
                  <a-menu-divider />
                  <a-menu-item key="logout">
                      <a-icon type="logout" />
                      退出登录
                  </a-menu-item>
              </a-menu>
		      </a-dropdown>
      </li>
	</ul>
	`
}


/**
 * header 信息
 * @author shizhongming
 * 2020/8/30 7:46 下午
 */
export default {
	components: {
		Operation
	},
	computed: {
		computedBus () {
			return window.busVue
		},
		computedStyle () {
			return {
				padding: '0',
				right: '0',
				position: 'fixed',
				top: '0',
				// @ts-ignore
				width: `calc(100% - ${this.computedBus.sidebar.opened ? '256' : '80'}px)`
			}
		}
	},
	methods: {
		toggle () {
			// @ts-ignore
			this.computedBus.sidebar.opened = !this.computedBus.sidebar.opened
		}
	},
	// language=html
	template: `
	<transition>
			<div class="header-animat">
					<a-layout-header/>
					<a-layout-header
						:class="['ant-pro-fixed-header']"
            :style="computedStyle">
							<div class="header">
	              	<a-icon class="trigger" :type="computedBus.sidebar.opened ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
							</div>
							<div style="position: absolute; right: 10px; top: 0;">
									<Operation/>
							</div>
					</a-layout-header>
			</div>
	</transition>
	`
}


