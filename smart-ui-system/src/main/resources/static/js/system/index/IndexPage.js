define(["require", "exports", "js/common/PageBuilder", "./components/header/TopHeader", "./components/side/SideMenu", "./components/footer/Footer", "./components/contabs/Contabs", "./components/main/PageContainer", "../mixins/ThemeMixins", "js/common/utils/DataApiService", "../SysBus"], function (require, exports, PageBuilder_1, TopHeader_1, SideMenu_1, Footer_1, Contabs_1, PageContainer_1, ThemeMixins_1, DataApiService_1, SysBus_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IndexPage extends PageBuilder_1.default {
        initPage() {
            window['busVue'] = SysBus_1.default();
            this.init();
        }
        build() {
            return page;
        }
    }
    exports.default = IndexPage;
    const page = {
        components: {
            TopHeader: TopHeader_1.default,
            SideMenu: SideMenu_1.default,
            Footer: Footer_1.default,
            Contabs: Contabs_1.default,
            PageContainer: PageContainer_1.default
        },
        mixins: [
            ThemeMixins_1.default
        ],
        mounted() {
            this.loadUserMenus();
        },
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedCollapsed() {
                return !this.computedBus.sidebar.opened;
            },
            computedSideClass() {
                return this.computedTheme.menuTheme === 'dark' ? ['site-menubar-dark'] : ['site-menubar-light'];
            },
            computedRightStyle() {
                return {
                    'margin-left': this.computedTheme.sideWidth + 'px'
                };
            },
            computedTabsStyle() {
                return Object.assign(Object.assign({}, this.computedTabsHeight), this.computedRightStyle);
            },
            computedMainStyle() {
                const height = this.computedBus.theme.footerVisible === true ? 44 : 0;
                return Object.assign(Object.assign({}, this.computedRightStyle), { 'margin-top': this.computedTheme.tabsHeight + 'px', height: `calc(100% - ${height}px)` });
            }
        },
        methods: {
            loadUserMenus() {
                if (this.computedBus.userMenuTree.length === 0) {
                    DataApiService_1.default.postAjax('sys/user/listUserMenu')
                        .then(data => {
                        this.computedBus.setUserMenuTree(data.map(item => {
                            return {
                                key: item.functionId + '',
                                title: item.functionName,
                                icon: item.icon,
                                path: item.url,
                                parentKey: item.parentId + '',
                                data: item,
                                active: false
                            };
                        }));
                    }).catch(error => {
                        console.error(error);
                        this.$message.error('加载用户菜单失败');
                    });
                }
            }
        },
        template: `
	<div style="height: 100%">
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
    };
});
