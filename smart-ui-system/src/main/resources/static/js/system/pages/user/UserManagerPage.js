define(["require", "exports", "js/common/utils/ModuleLoader", "js/common/PageBuilder", "./components/UserList"], function (require, exports, ModuleLoader_1, PageBuilder_1, UserList_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class UserManagerPage extends PageBuilder_1.default {
        init() {
            ModuleLoader_1.default(['vue-ant-table']).then(() => {
                this.initVue();
            });
        }
        build() {
            return page;
        }
    }
    exports.default = UserManagerPage;
    const page = {
        components: {
            UserList: UserList_1.default
        },
        template: `
	<div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)" >
      <div style="background: white; overflow:auto">
          <UserList
                  :row-selection="{}"/>
      </div>	
	</div>
	`
    };
});
