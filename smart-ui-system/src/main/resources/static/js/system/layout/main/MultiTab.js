define(["require", "exports", "js/component/navigation/Navigation"], function (require, exports, Navigation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            Navigation: Navigation_1.default
        },
        props: {
            menuList: Array
        },
        data() {
            return {};
        },
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedActiveMenu() {
                return this.computedBus.activeMenu;
            }
        },
        methods: {
            handleRemove(key) {
                this.computedBus.removeMenu(key);
            },
            handleNavChange(key) {
                this.computedBus.addMenu(key);
            },
            handleClickDropdownMenu({ key }) {
                switch (key) {
                    case 'location': {
                        break;
                    }
                    case 'closeAll': {
                        this.computedBus.removeAllMenu();
                        break;
                    }
                    case 'closeOther': {
                        this.computedBus.removeAllMenu(false);
                        break;
                    }
                }
            }
        },
        template: `
		<div style="margin-bottom: 0px; margin-left: 0" class="ant-pro-multi-tab">
				<div class="ant-pro-multi-tab-wrapper">
						<Navigation
								:menuList="menuList"
								@remove="handleRemove"
								:value="computedActiveMenu.key"
								@input="handleNavChange">
                <a-menu @click="handleClickDropdownMenu" slot="dropdown-menu">
                    <a-menu-item key="location">定位当前选项卡 </a-menu-item>
                    <a-divider />
                    <a-menu-item key="closeAll">关闭全部选项卡 </a-menu-item>
                    <a-menu-item key="closeOther">关闭其他选项卡 </a-menu-item>
                </a-menu>
						</Navigation>
				</div>
		</div>
	
	`
    };
});
