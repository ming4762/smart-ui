define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        props: {
            menuList: {
                type: Array,
                default: function () { return ([]); }
            },
            value: String
        },
        data: function () {
            return {
                hoverData: {}
            };
        },
        methods: {
            handleClick: function (_a) {
                var key = _a.key;
                this.$emit('input', key);
            },
            handleMouseover: function (_a) {
                var key = _a.key;
                console.log('======');
            },
            handleRemoveMenu: function (_a, event) {
                var key = _a.key;
                this.$emit('remove', key);
                event.stopPropagation();
            }
        },
        template: "\n\t<div class=\"content-tabs\">\n\t\t\t<div class=\"roll-nav roll-left direction-button\">\n          <a-icon type=\"backward\"/>\n\t\t\t</div>\n\t\t\t<nav class=\"page-tabs J_menuTabs\">\n\t\t\t\t\t<div class=\"page-tabs-content\" style=\"margin-left: 0\">\n\t\t\t\t\t\t\t<a \n\t\t\t\t\t\t\t\thref=\"javascript:;\"\n\t\t\t\t\t\t\t\t@click=\"handleClick(menu)\"\n\t\t\t\t\t\t\t\t:class=\"['J_menuTab', menu.key === value ? 'active' : '']\"\n\t\t\t\t\t\t\t\tv-for=\"(menu, i) in menuList\">\n\t\t\t\t\t\t\t\t\t{{menu.title}}\n                  <a-icon @click=\"handleRemoveMenu(menu, $event)\" :style=\"{color: '#CCCCCC'}\" theme=\"filled\" v-if=\"i !== 0\" type=\"close-circle\" />\n\t\t\t\t\t\t\t</a>\n\t\t\t\t\t</div>\n\t\t\t</nav>\n      <div class=\"roll-nav roll-right direction-button J_tabRight\">\n          <a-icon type=\"forward\" />\n      </div>\n\t\t\t<a-dropdown >\n\t\t\t\t\t<div class=\"btn-group roll-nav roll-right\">\n\t\t\t\t\t\t\t<span>\u5173\u95ED\u64CD\u4F5C</span>\n              <a-icon type=\"caret-down\" />\n\t\t\t\t\t</div>\n\t\t\t\t\t<slot name=\"dropdown-menu\" slot=\"overlay\"></slot>\n\t\t\t</a-dropdown>\n\t</div>\n\t"
    };
});
