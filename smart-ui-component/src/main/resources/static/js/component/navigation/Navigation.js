define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        props: {
            menuList: {
                type: Array,
                default: () => ([])
            },
            value: String
        },
        data() {
            return {
                hoverData: {}
            };
        },
        methods: {
            handleClick({ key }) {
                this.$emit('input', key);
            },
            handleMouseover({ key }) {
                console.log('======');
            },
            handleRemoveMenu({ key }, event) {
                this.$emit('remove', key);
                event.stopPropagation();
            }
        },
        template: `
	<div class="content-tabs">
			<div class="roll-nav roll-left direction-button">
          <a-icon type="backward"/>
			</div>
			<nav class="page-tabs J_menuTabs">
					<div class="page-tabs-content" style="margin-left: 0">
							<a 
								href="javascript:;"
								@click="handleClick(menu)"
								:class="['J_menuTab', menu.key === value ? 'active' : '']"
								v-for="(menu, i) in menuList">
									{{menu.title}}
                  <a-icon @click="handleRemoveMenu(menu, $event)" :style="{color: '#CCCCCC'}" theme="filled" v-if="i !== 0" type="close-circle" />
							</a>
					</div>
			</nav>
      <div class="roll-nav roll-right direction-button J_tabRight">
          <a-icon type="forward" />
      </div>
			<a-dropdown >
					<div class="btn-group roll-nav roll-right">
							<span>关闭操作</span>
              <a-icon type="caret-down" />
					</div>
					<slot name="dropdown-menu" slot="overlay"></slot>
			</a-dropdown>
	</div>
	`
    };
});
