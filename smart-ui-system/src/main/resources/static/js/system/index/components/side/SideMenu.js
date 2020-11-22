define(["require", "exports", "../../../layout/menu/SMenu", "../../../mixins/ThemeMixins"], function (require, exports, SMenu_1, ThemeMixins_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            SMenu: SMenu_1.default
        },
        mixins: [
            ThemeMixins_1.default
        ],
        computed: {
            computedBusVue() {
                return window.busVue;
            },
            computedUserMenuTree() {
                const activeTopMenu = this.computedBusVue.activeTopMenu;
                return activeTopMenu ? activeTopMenu.children : [];
            }
        },
        template: `
    <SMenu 
		    :theme="computedTheme.menuTheme"
		    :style="computedSideMenuStyle"
		    style="padding: 16px 0; border-right: none"
		    :menuList="computedUserMenuTree"/>
	`
    };
});
