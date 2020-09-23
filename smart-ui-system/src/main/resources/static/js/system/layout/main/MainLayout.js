define(["require", "exports", "./MainHeader", "./MultiTab", "./PageContainer"], function (require, exports, MainHeader_1, MultiTab_1, PageContainer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            MainHeader: MainHeader_1.default,
            MultiTab: MultiTab_1.default,
            PageContainer: PageContainer_1.default
        },
        data() {
            return {
                fixedHeader: true
            };
        },
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedOpenMenuList() {
                return this.computedBus.openMenuList;
            }
        },
        template: `
		<a-layout>
				<!--		头部		-->
				<MainHeader/>
				<!--		主体		-->
				<a-layout-content :style="{  margin: '24px 0 0', paddingTop: fixedHeader ? '0' : '0' }">
						<MultiTab
							:menuList="computedOpenMenuList"/>
						<PageContainer
							:activeMenu="computedBus.activeMenu"
							:openMenuList="computedBus.openMenuList"/>
				</a-layout-content>
		</a-layout>
	`
    };
});
