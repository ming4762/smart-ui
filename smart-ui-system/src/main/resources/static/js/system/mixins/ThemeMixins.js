define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        computed: {
            computedBus() {
                return window.busVue;
            },
            computedSidebarWidth() {
                return this.computedBus.sidebar.opened ? 256 : 80;
            },
            computedTheme() {
                const menuThemeColor = this.computedBus.theme.menuTheme === 'dark' ? '#273238' : '#FFFFFF';
                return Object.assign(Object.assign({}, this.computedBus.theme), { menuThemeColor: menuThemeColor });
            },
            computedRightHeaderStyle() {
                return {
                    'background-color': this.computedTheme.navigationColor
                };
            },
            computedLeftHeaderStyle() {
                const width = this.computedTheme.sideWidth + 'px';
                return {
                    'background-color': this.computedTheme.navigationColor,
                    width: width,
                    'min-width': width
                };
            },
            computedTabsHeight() {
                return {
                    height: this.computedTheme.tabsHeight + 'px'
                };
            },
            computedSideMenuStyle() {
                return {
                    'background-color': this.computedTheme.menuThemeColor,
                    width: this.computedTheme.sideWidth + 'px'
                };
            }
        }
    };
});
