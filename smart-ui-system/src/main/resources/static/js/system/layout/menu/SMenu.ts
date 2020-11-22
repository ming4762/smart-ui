/**
 * 菜单组件
 * @author shizhongming
 * 2020/8/29 8:24 下午
 */
const subMenu = {
	isSubMenu: true,
	props: {
		menu: {
			type: Object,
			required: true
		}
	},
	// language=html
	template: `
<a-sub-menu
  v-bind="$attrs"
  v-on="$listeners"
  :key="menu.key">
	<span slot="title">
    <a-icon type="mail" />
		<span>{{ menu.title }}</span>
  </span>
  <template v-for="item in menu.children">
      <a-menu-item v-if="!item.children" :key="item.key">
          <a-icon type="pie-chart" />
          <span>{{ item.title }}</span>
      </a-menu-item>
      <SubMenu v-else :key="item.key" :menu="item" />
  </template>
</a-sub-menu>		
	`
}

function getLeafMenuTemplate (menu: any): any {

}

export default {
	components: {
		SubMenu: subMenu
	},
	props: {
		menuList: {
			type: Array,
			default: () => ([])
		}
	},
	data () {
		return {
			selectedKeys: []
		}
	},
	mounted () {

	},
	computed: {
		computedBus () {
			return window.busVue
		},
		/**
		 * 激活的菜单
		 */
		computedActiveKeys () {
			// @ts-ignore
			const activeMenu: any = this.computedBus.activeMenu
			const keys = []
			if (activeMenu.key) {
				keys.push(activeMenu.key)
			}
			return keys
		},

	},
	methods: {
		/**
		 * 是否有下级
		 * @param menu
		 */
		hasChildren (menu: any): boolean {
			return menu.children && menu.children.length > 0
		},
		/**
		 * 点击菜单
		 */
		handleClickMenu ({ key }: any) {
			// @ts-ignore
			this.computedBus.addMenu(key)
		}
	},
	template: `
<a-menu
  mode="inline"
  :selectedKeys="computedActiveKeys"
  v-bind="$attrs"
	@click="handleClickMenu">
	<template
		v-for="item in menuList">
      <a-menu-item v-if="!hasChildren(item)" :key="item.key">
        <a-icon v-if="item.icon" :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
			<a-sub-menu
				v-else
				:key="item.key">
				<span slot="title">
			    <a-icon v-if="item.icon" :type="item.icon" />
					<span>{{ item.title }}</span>
			  </span>
				<template v-for="menu2 in item.children">
            <a-menu-item v-if="!hasChildren(menu2)" :key="menu2.key">
                <a-icon v-if="menu2.icon" :type="menu2.icon" />
                <span>{{ menu2.title }}</span>
            </a-menu-item>
						<a-sub-menu v-else :key="menu2.key">
								<span slot="title">
							    <a-icon v-if="menu2.icon" :type="menu2.icon" />
									<span>{{ menu2.title }}</span>
							  </span>
								<template v-for="menu3 in menu2.children">
                    <a-menu-item v-if="!hasChildren(menu3)" :key="menu3.key">
                        <a-icon v-if="menu3.icon" :type="menu3.icon" />
                        <span>{{ menu3.title }}</span>
                    </a-menu-item>
								</template>
						</a-sub-menu>
				</template>
			</a-sub-menu>
	</template>	
</a-menu>
	`
}

