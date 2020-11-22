define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedOpenMenuList() {
                return this.computedBus.openMenuList;
            },
            computedBus() {
                return window.busVue;
            }
        },
        template: `
	<div>
			<iframe
				v-for="menu in computedOpenMenuList"
				class="page-frame animation-fade"
				style="height: 100%"
				frameborder="0"
				:class="menu.key === computedBus.activeMenu.key ? ['active'] : []"
				:src="menu.path"
				:key="menu.key"></iframe>
	</div>
	`
    };
});
