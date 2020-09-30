define(["require", "exports", "js/common/PageBuilder", "js/system/SysBus", "js/common/utils/DataApiService", "js/system/layout/BasicLayout"], function (require, exports, PageBuilder_1, SysBus_1, DataApiService_1, BasicLayout_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DataApiService_1.default.validateLogin();
    class HomePage extends PageBuilder_1.default {
        initPage() {
            window['busVue'] = SysBus_1.default();
            this.init();
        }
        build() {
            return page;
        }
    }
    exports.default = HomePage;
    const page = {
        components: {
            BasicLayout: BasicLayout_1.default
        },
        template: `
<div class="full-height">
    <BasicLayout/>
</div>        
    `
    };
});
