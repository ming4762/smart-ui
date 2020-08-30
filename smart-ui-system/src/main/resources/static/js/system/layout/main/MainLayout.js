define(["require", "exports", "system/layout/main/MainHeader", "system/layout/main//MultiTab"], function (require, exports, MainHeader_1, MultiTab_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            MainHeader: MainHeader_1.default,
            MultiTab: MultiTab_1.default
        },
        data: function () {
            return {
                fixedHeader: true
            };
        },
        template: "\n\t\t<a-layout>\n\t\t\t\t<!--\t\t\u5934\u90E8\t\t-->\n\t\t\t\t<MainHeader/>\n\t\t\t\t<!--\t\t\u4E3B\u4F53\t\t-->\n\t\t\t\t<a-layout-content :style=\"{ height: '100%', margin: '24px 24px 0', paddingTop: fixedHeader ? '0' : '0' }\">\n\t\t\t\t\t\t<MultiTab/>\n\t\t\t\t</a-layout-content>\n\t\t</a-layout>\n\t"
    };
});
