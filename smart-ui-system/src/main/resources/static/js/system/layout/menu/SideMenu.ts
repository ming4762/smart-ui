// @ts-ignore
import TreeUtils from 'common/utils/TreeUtils'

// @ts-ignore
import SMenu from 'system/layout/menu/SMenu'

/**
 * logo组件
 */
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
  // language=html
  template: `
  <div class="system-logo">
    <a>
      <h1 v-if="showTitle">{{ title }}</h1>
    </a>
  </div>
  `
}

/**
 *
 * @author shizhongming
 * 2020/8/29 8:17 下午
 */
export default {
  components: {
    SMenu: SMenu,
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
  data () {
    return {
    }
  },
  computed: {
    computedUserMenuTree () {
      const userMenuList = window.busVue.userMenuList || []
      return TreeUtils.convertList2Tree(userMenuList, ['key', 'parentKey'], '0')
    }
  },
  // language=html
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
}
