/**
 *
 * @author shizhongming
 * 2020/11/21 11:35 下午
 */
export default {
	computed: {
		computedMenuTree () {
			return window.busVue.userMenuTree
		},
		/**
		 * 激活的顶部菜案
		 */
		computedActiveTopMenu () {
			return window.busVue.activeTopMenu
		}
	},
	methods: {
		/**
		 * 点击顶部菜单触发
		 * @param menu
		 */
		handleClickTopMenu ({ key }) {
			window.busVue.setTopActiveMenu(key)
		}
	},
	// language=html
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
}