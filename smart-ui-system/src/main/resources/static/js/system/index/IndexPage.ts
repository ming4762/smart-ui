// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'
import TopHeader from './components/header/TopHeader'
import SideMenu from './components/side/SideMenu'
import Footer from './components/footer/Footer'
import Contabs from './components/contabs/Contabs'
import PageContainer from './components/main/PageContainer'

import ThemeMixins from '../mixins/ThemeMixins'
// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'

import initBus from '../SysBus'

export default class IndexPage extends PageBuilder {
	public initPage () {
		// 初始化bus
		window['busVue'] = initBus()
		// @ts-ignore
		this.init()
	}

	protected build() {
		return page
	}
}

const page = {
	components: {
		TopHeader,
		SideMenu,
		Footer,
		Contabs,
		PageContainer
	},
	mixins: [
		ThemeMixins
	],
	mounted () {
		this.loadUserMenus()
	},
	computed: {
		computedBus () {
			return window.busVue
		},
		computedCollapsed () {
			// @ts-ignore
			return !this.computedBus.sidebar.opened
		},
		computedSideClass () {
			return this.computedTheme.menuTheme === 'dark' ? ['site-menubar-dark'] : ['site-menubar-light']
		},
		computedRightStyle() {
			return {
				'margin-left': this.computedTheme.sideWidth + 'px'
			}
		},
		computedTabsStyle () {
			return  {
				...this.computedTabsHeight,
				...this.computedRightStyle
			}
		},
		/**
		 * 主体样式计算属性
		 */
		computedMainStyle () {
			const height = this.computedBus.theme.footerVisible === true ? 44 : 0
			return {
				...this.computedRightStyle,
				'margin-top': this.computedTheme.tabsHeight + 'px',
				height: `calc(100% - ${height}px)`
			}
		}
	},
	methods: {
		/**
		 * 加载用户菜单信息
		 */
		loadUserMenus () {
			if (this.computedBus.userMenuTree.length === 0) {
				DataApiService.postAjax('sys/user/listUserMenu')
					.then(data => {
						this.computedBus.setUserMenuTree(
							data.map(item => {
								return {
									key: item.functionId + '',
									title: item.functionName,
									icon: item.icon,
									path: item.url,
									parentKey: item.parentId + '',
									data: item,
									active: false
								}
							})
						)
					}).catch(error => {
					console.error(error)
					this.$message.error('加载用户菜单失败')
				})
			}
		}
	},
	// language=html
	template: `
	<div style="height: calc(100% - 30px)">
      <a-spin class="full-height" :spinning="computedBus.control.allLoading">
          <!--		头部信息		-->
          <TopHeader class="site-navbar navbar navbar-default navbar-fixed-top navbar-inverse  bg-blue-600">
          </TopHeader>
          <!--		左侧菜单栏		-->
          <nav :style="computedSideMenuStyle" class="site-menubar site-menubar-dark">
              <SideMenu/>
          </nav>
          <!--		导航栏		-->
          <Contabs :style="computedTabsStyle" class="site-contabs"/>
          <!--		主体		-->
          <main :style="computedMainStyle" class="site-page">
              <a-spin class="full-height" :spinning="computedBus.control.pageLoading">
                  <PageContainer class="page-container full-height"/>
              </a-spin>
          </main>
          <!--		FOOTER		-->
          <Footer v-if="computedBus.theme.footerVisible" :style="computedRightStyle" class="site-footer"/>
      </a-spin>
	</div>
	`
}
