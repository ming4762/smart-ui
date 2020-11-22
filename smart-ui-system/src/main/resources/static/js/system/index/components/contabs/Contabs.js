define(["require", "exports", "../../../mixins/ThemeMixins"], function (require, exports, ThemeMixins_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        mixins: [
            ThemeMixins_1.default
        ],
        data() {
            return {
                show: false
            };
        },
        computed: {
            computedOpenMenuList() {
                return [
                    {
                        title: '首页',
                        key: 'ceshi',
                        herf: 'https://www.baidu.com'
                    }
                ].concat(this.computedBus.openMenuList);
            },
            computedTabListStyle() {
                return {
                    width: (this.computedOpenMenuList.length * 105) + 'px'
                };
            },
            computedRightButtonStyle() {
                return {
                    height: (this.computedTheme.tabsHeight - 1) + 'px'
                };
            }
        },
        methods: {
            handleClickMenu({ key }) {
                console.log(key);
            },
            handleCloseMenu(key, event) {
                this.computedBus.removeMenu(key);
                event.stopPropagation();
            },
            handleClick({ key }) {
                this.computedBus.addMenu(key);
            }
        },
        template: `
	<nav>
			<div :style="computedTabsHeight" class="contabs-scroll float-left">
					<ul class="nav con-tabs" :style="computedTabListStyle">
							<li
									:key="menu.key"
									:class="menu.key === computedBus.activeMenu.key ? ['active'] : []"
									v-for="(menu, i) in computedOpenMenuList">
									<!--				TODO: 样式写死 应该根据	tabsHeight动态调整				-->
									<a style="line-height: 30px; height: 30px" href="javascript:;" @click="handleClick(menu)" :title="menu.title">
											<span>{{menu.title}}</span>
											<i @click="handleCloseMenu(menu.key, $event)" v-if="i !== 0" style="top: 9px" class="icon wb-close-mini"/>
									</a>
							</li>
					</ul>
			</div>
			<div :class="show ? ['show'] : []" class="btn-group float-right">
					<a-dropdown v-model="show" :trigger="['click']">
              <button :style="computedRightButtonStyle" type="button" class="btn btn-default dropdown-toggle btn-outline"/>
              <a-menu @click="handleClickMenu" slot="overlay">
                  <a-menu-item key="refresh">
<!--                      <a-icon :style="{'font-size': '14px'}" type="inbox" />-->
                      <span>刷新当前</span>
                  </a-menu-item>
                  <a-menu-item key="close-current">
                      <span>关闭其他</span>
                  </a-menu-item>
                  <a-menu-item key="close-all">
                      <span>关闭所有</span>
                  </a-menu-item>
              </a-menu>
					</a-dropdown>
			</div>
	</nav>	
	`
    };
});
