define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        props: {
            openMenuList: {
                type: Array,
                required: true
            },
            activeMenu: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                menuPaths: {}
            };
        },
        computed: {
            computedActiveMenu() {
                return window.busVue.activeMenu;
            }
        },
        watch: {},
        methods: {
            getMenuPath(menu) {
                console.log(menu);
                return menu.path;
            }
        },
        template: `
	<div class="page-container">
      <iframe
        :class="menu.key === activeMenu.key ? 'active' : ''"
        class="animation-fade page-frame"
        v-for="menu in openMenuList"
        :src="getMenuPath(menu)"
        :key="menu.key"/>
	</div>
	`
    };
});
