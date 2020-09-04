define(["require", "exports", "component/navigation/Navigation"], function (require, exports, Navigation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            Navigation: Navigation_1.default
        },
        template: "\n\t\t<div style=\"margin-bottom: 15px; margin-left: -15px\" class=\"ant-pro-multi-tab\">\n\t\t\t\t<div class=\"ant-pro-multi-tab-wrapper\">\n\t\t\t\t\t\t<Navigation/>\n<!--            <a-tabs-->\n<!--              type=\"editable-card\"-->\n<!--              :tabBarStyle=\"{ background: '#FFF', margin: 0, paddingLeft: '16px', paddingTop: '1px' }\"-->\n<!--            \thideAdd></a-tabs>-->\n\t\t\t\t</div>\n\t\t</div>\n\t\n\t"
    };
});
