define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedMenuTree() {
                return window.busVue.userMenuTree;
            },
            computedActiveTopMenu() {
                return window.busVue.activeTopMenu;
            }
        },
        methods: {
            handleClickTopMenu({ key }) {
                window.busVue.setTopActiveMenu(key);
            }
        },
        template: `
	<ul>
			<li class="nav-item hidden-float">
<!--					<a class="nav-link">-->
<!--							<i class="icon hamburger hamburger-arrow-left">-->
<!--                  <span class="sr-only">切换目录</span>-->
<!--                  <span class="hamburger-bar"></span>-->
<!--							</i>-->
<!--					</a>-->
			</li>
			<li style="margin-left: 50px;" class="navbar-menu nav-tabs-horizontal nav-tabs-animate">
					<ul class="header-menu nav navbar-toolbar nav-tabs">
							<li class="nav-item"
							    :key="menu.key"
									v-for="menu in computedMenuTree">
									<a @click="() => handleClickTopMenu(menu)" class="nav-link show" :class="menu.key === computedActiveTopMenu.key ? ['active'] : []">
                      <a-icon :type="menu.icon" />
											<span>{{menu.title}}</span>
									</a>
							</li>
					</ul>
			</li>
	</ul>
	`
    };
});
