// @ts-ignore
import CommonUtils from 'js/common/utils/CommonUtils'
import SystemUtils from 'js/system/utils/SystemUtils'
import ApiOperation from 'js/system/utils/ApiOperation'
/**
 *
 * @author shizhongming
 * 2020/11/21 11:37 下午
 */
export default {
	data () {
		return {
			iconStyle: {
				'font-size': '18px'
			},
			// 是否全屏
			isFullScreen: false
		}
	},
	methods: {
		/**
		 * 开启退户全屏
		 */
		handleFullscreen () {
			this.isFullScreen = !this.isFullScreen
			CommonUtils.fullScreen(this.isFullScreen)
		},
		/**
		 * 设置主题
		 */
		handleSetTheme () {
			// TODO: 开发中
		},
		handleClickMenu ({ key }) {
			switch (key) {
				case 'logout': {
					this.logout()
					break
				}
			}
		},
		/**
		 * 登出操作
		 */
		logout () {
			this.$confirm({
				title: '确定要退出登录吗？',
				onOk() {
					ApiOperation.logout()
				}
			})
		}
	},
	// language=html
	template: `
	<ul>
			<li class="nav-item">
          <a-dropdown :trigger="['click']" overlayClassName="user-menu" placement="bottomLeft">
		          <a class="nav-link" style="padding: 17px 15px 18px 15px">
                  <a-avatar :size="24" icon="user" />
		          </a>
		          <a-menu @click="handleClickMenu" slot="overlay">
				          <a-menu-item>
                      <a-icon :style="iconStyle" type="appstore"/>
                      账户信息
				          </a-menu-item>
                  <a-menu-item>
                      <a-icon type="key" />
                      修改密码
                  </a-menu-item>
				          <a-menu-item>
                      <a-divider></a-divider>
				          </a-menu-item>
                  <a-menu-item key="logout">
                      退出登录
                  </a-menu-item>
		          </a-menu>
          </a-dropdown>
			</li>
			<li class="nav-item">
					<a-tooltip title="设置主题布局">
              <a @click="handleSetTheme" class="nav-link">
                  <a-icon :style="iconStyle" type="appstore"/>
              </a>
					</a-tooltip>
			</li>
      <li class="nav-item">
          <a-tooltip :title="isFullScreen ? '退出全屏' : '全屏'">
              <a @click="handleFullscreen" class="nav-link">
                  <a-icon :style="iconStyle" :type="isFullScreen ? 'fullscreen' : 'fullscreen-exit'"/>
              </a>
          </a-tooltip>
      </li>
	</ul>
	`
}