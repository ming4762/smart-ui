define(["require", "exports", "js/common/utils/CommonUtils"], function (require, exports, CommonUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        data() {
            return {
                iconStyle: {
                    'font-size': '18px'
                },
                isFullScreen: false
            };
        },
        methods: {
            handleFullscreen() {
                this.isFullScreen = !this.isFullScreen;
                CommonUtils_1.default.fullScreen(this.isFullScreen);
            },
            handleSetTheme() {
            }
        },
        template: `
	<ul>
			<li class="nav-item">
          <a-dropdown :trigger="['click']" overlayClassName="user-menu" placement="bottomLeft">
		          <a class="nav-link" style="padding: 17px 15px 18px 15px">
                  <a-avatar :size="24" icon="user" />
		          </a>
		          <a-menu slot="overlay">
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
                  <a-menu-item>
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
    };
});
