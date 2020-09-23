define(["require", "exports", "js/common/utils/TreeUtils", "./SMenu"], function (require, exports, TreeUtils_1, SMenu_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const Logo = {
        props: {
            title: {
                type: String,
                default: 'Ant Design Pro',
                required: false
            },
            showTitle: {
                type: Boolean,
                default: true,
                required: false
            }
        },
        template: `
  <div class="system-logo">
    <a>
      <h1 v-if="showTitle">{{ title }}</h1>
    </a>
  </div>
  `
    };
    exports.default = {
        components: {
            SMenu: SMenu_1.default,
            Logo
        },
        props: {
            mode: {
                type: String,
                required: false,
                default: 'inline'
            },
            collapsible: {
                type: Boolean,
                required: false,
                default: false
            },
            collapsed: {
                type: Boolean,
                required: false,
                default: false
            }
        },
        data() {
            return {};
        },
        computed: {
            computedUserMenuTree() {
                const userMenuList = window.busVue.userMenuList || [];
                return TreeUtils_1.default.convertList2Tree(userMenuList, ['key', 'parentKey'], '0');
            }
        },
        template: `
<a-layout-sider
  :class="['sider', 'ant-fixed-sidemenu']"
  width="256px"
  v-model="collapsed"
  :collapsible="collapsible"
  :trigger="null">
  <Logo/>
  <SMenu style="padding: 16px 0" :menuList="computedUserMenuTree"></SMenu>
</a-layout-sider>
  `
    };
});
