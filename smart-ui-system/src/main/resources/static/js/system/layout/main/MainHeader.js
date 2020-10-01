define(["require", "exports", "js/common/utils/CommonUtils", "../../utils/ApiOperation"], function (require, exports, CommonUtils_1, ApiOperation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Operation = {
        data() {
            return {
                fullscreen: false
            };
        },
        methods: {
            handleFullscreen() {
                CommonUtils_1.default.fullScreen(!this.fullscreen);
                this.fullscreen = !this.fullscreen;
            },
            handleMenuClick({ key }) {
                switch (key) {
                    case 'logout':
                        this.$confirm({
                            title: '确定要退出登录吗？',
                            onOk() {
                                ApiOperation_1.default.logout();
                            }
                        });
                        break;
                }
            },
        },
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
    };
    exports.default = {
        components: {
            Operation
        },
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedStyle() {
                return {
                    padding: '0',
                    right: '0',
                    position: 'fixed',
                    top: '0',
                    width: `calc(100% - ${this.computedBus.sidebar.opened ? '256' : '80'}px)`
                };
            }
        },
        methods: {
            toggle() {
                this.computedBus.sidebar.opened = !this.computedBus.sidebar.opened;
            }
        },
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
    };
});
