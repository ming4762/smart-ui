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
	mounted () {
		console.log(this)
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
	computed: {
		computedBus () {
			return window.busVue
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
	mounted () {
	},
	// language=html
	template: `
<a-menu
  mode="inline"
	@click="handleClickMenu"
  theme="dark">
	<template
		v-for="item in menuList">
      <a-menu-item v-if="!hasChildren(item)" :key="item.key">
        <a-icon :type="item.icon" />
        <span>{{ item.title }}</span>
      </a-menu-item>
			<a-sub-menu
				v-else
				:key="item.key">
				<span slot="title">
			    <a-icon :type="item.icon" />
					<span>{{ item.title }}</span>
			  </span>
				<template v-for="menu2 in item.children">
            <a-menu-item v-if="!hasChildren(menu2)" :key="menu2.key">
                <a-icon :type="menu2.icon" />
                <span>{{ menu2.title }}</span>
            </a-menu-item>
						<a-sub-menu v-else :key="menu2.key">
								<span slot="title">
							    <a-icon :type="menu2.icon" />
									<span>{{ menu2.title }}</span>
							  </span>
								<template v-for="menu3 in menu2.children">
                    <a-menu-item v-if="!hasChildren(menu3)" :key="menu3.key">
                        <a-icon :type="menu3.icon" />
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

