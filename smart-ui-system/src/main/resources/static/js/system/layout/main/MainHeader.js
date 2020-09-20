define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedStyle() {
                return {
                    padding: '0',
                    right: '0',
                    position: 'fixed',
                    top: '0',
                    width: `calc(100% - ${this.computedBus.sidebar.opened ? '256' : '80'}px)`
                };
            }
        },
        methods: {
            toggle() {
                this.computedBus.sidebar.opened = !this.computedBus.sidebar.opened;
            }
        },
        template: `
	<transition>
			<div class="header-animat">
					<a-layout-header/>
					<a-layout-header
						:class="['ant-pro-fixed-header']"
            :style="computedStyle">
						<div class="header">
              <a-icon class="trigger" :type="computedBus.sidebar.opened ? 'menu-fold' : 'menu-unfold'" @click="toggle"/>
						</div>	
					</a-layout-header>
			</div>
	</transition>
	`
    };
});
