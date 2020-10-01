define(["require", "exports", "js/common/PageBuilder", "js/common/utils/ModuleLoader", "js/common/utils/DataApiService", "js/common/utils/CommonUtils", "js/common/utils/TreeUtils"], function (require, exports, PageBuilder_1, ModuleLoader_1, DataApiService_1, CommonUtils_1, TreeUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DataApiService_1.default.init401ErrorHandler();
    let moment = window['moment'];
    CommonUtils_1.default.addCSS(`
	.ant-table-row.current-role {
			background-color: oldlace;
	}
	`);
    class RoleManagePage extends PageBuilder_1.default {
        init() {
            ModuleLoader_1.default(['vue-ant-table']).then(() => {
                this.initVue();
            });
        }
        build() {
            return basePage;
        }
    }
    exports.default = RoleManagePage;
    const RoleComponent = {
        data() {
            return {
                columns: [
                    {
                        label: 'roleId',
                        prop: 'roleId',
                        table: {
                            width: 120,
                            visible: false,
                            config: false
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '角色名称',
                        prop: 'roleName',
                        table: {
                            width: 120,
                            fixed: true
                        },
                        form: {
                            rules: true
                        }
                    },
                    {
                        label: '角色编码',
                        prop: 'roleCode',
                        table: {
                            width: 150,
                            fixed: true
                        },
                        form: {
                            rules: true
                        }
                    },
                    {
                        label: '部门id',
                        prop: 'deptId',
                        table: {
                            width: 120
                        },
                        form: {}
                    },
                    {
                        label: '备注',
                        prop: 'remark',
                        table: {
                            width: 120,
                            ellipsis: true
                        },
                        form: {}
                    },
                    {
                        label: '是否启用',
                        prop: 'enable',
                        table: {
                            width: 120
                        },
                        form: {
                            defaultValue: true
                        },
                        type: 'boolean'
                    },
                    {
                        label: '角色类型',
                        prop: 'roleType',
                        table: {
                            width: 120,
                            scopedSlots: { customRender: 'table-roleType' }
                        },
                        form: {
                            defaultValue: '20',
                            dict: [
                                {
                                    key: '10',
                                    value: '系统角色'
                                },
                                {
                                    key: '20',
                                    value: '业务角色'
                                }
                            ]
                        },
                        type: 'radio'
                    },
                    {
                        label: '序号',
                        prop: 'seq',
                        table: {
                            width: 120
                        },
                        form: {
                            defaultValue: 1
                        },
                        type: 'number'
                    },
                    {
                        label: '创建人员',
                        prop: 'createUserId',
                        table: {
                            width: 120
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '创建时间',
                        prop: 'createTime',
                        table: {
                            width: 170,
                            customRender: (text) => {
                                if (text) {
                                    return moment(text).format('YYYY-MM-DD HH:MM');
                                }
                                return '';
                            },
                            sorter: true
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '更新人员',
                        prop: 'updateUserId',
                        table: {
                            width: 120
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '更新时间',
                        prop: 'updateTime',
                        table: {
                            width: 170,
                            customRender: (text) => {
                                if (text) {
                                    return moment(text).format('YYYY-MM-DD HH:MM');
                                }
                                return '';
                            },
                            sorter: true
                        },
                        form: {
                            visible: false
                        }
                    }
                ],
                apiService: DataApiService_1.default,
            };
        },
        template: `
  <div style="background: white; overflow:auto">
      <s-table-crud
        :keys="['roleId']"
        v-bind="$attrs"
        v-on="$listeners"
        :api-service="apiService"
        size="middle"
        default-search-visible
        pagination
        :bordered="false"
        :url="{
	        save: 'sys/role/save',
	        update: 'sys/role/update',
	        query: 'sys/role/list',
	        delete: 'sys/role/batchDeleteById',
	        get: 'sys/role/getById'
	      }"
        :row-selection="{}"
        table-name="角色管理"
        :add-edit-form-span="12"
        defaultSortColumn="seq"
        :scroll="{x: 1400}"
        :columns="columns"
        textRowButton>
          <template v-slot:table-roleType="{text}">
		          <a-tag :color="text === '10' ? '#f50' : '#108ee9'">
				          {{text === '10' ? '系统角色' : '业务角色'}}
		          </a-tag>
          </template>
      </s-table-crud>
  </div>
	`
    };
    const FunctionTree = {
        props: {
            roleId: null
        },
        data() {
            return {
                functionTree: [],
                treeLoading: false,
                replaceFields: {
                    key: 'functionId',
                    title: 'functionName'
                },
                treeModel: []
            };
        },
        mounted() {
            this.loadFunctionTree();
        },
        watch: {
            roleId(_new) {
                if (!!_new) {
                    this.treeLoading = true;
                    DataApiService_1.default.postAjax('sys/role/listFunctionId', _new)
                        .then(data => {
                        this.treeModel = data;
                    }).catch(error => {
                        console.error(error);
                        this.$message.error('加载角色菜单列表失败');
                    }).finally(() => {
                        this.treeLoading = false;
                    });
                }
            }
        },
        methods: {
            loadFunctionTree() {
                this.treeLoading = true;
                DataApiService_1.default.postAjax('sys/function/list')
                    .then(data => {
                    this.functionTree = TreeUtils_1.default.convertList2Tree(data, ['functionId', 'parentId'], 0);
                }).catch(error => {
                    console.error(error);
                    this.$message.error('加载功能树失败' + error.message);
                }).finally(() => {
                    this.treeLoading = false;
                });
            },
            handleSaveMenu() {
                if (Array.isArray(this.treeModel)) {
                    return false;
                }
                const { roleId, treeModel: { checked: functionIdList } } = this;
                this.treeLoading = true;
                DataApiService_1.default.postAjax('sys/role/saveRoleMenu', {
                    roleId, functionIdList
                }).then(data => {
                    this.$message.success('保存成功');
                }).catch(error => {
                    console.error(error);
                    this.$message.error('保存菜单失败:' + error.message);
                }).finally(() => {
                    this.treeLoading = false;
                });
            }
        },
        template: `
	<div class="full-height">
      <a-spin :spinning="treeLoading">
          <a-tree
                  checkable
                  :replaceFields="replaceFields"
                  v-model="treeModel"
                  checkStrictly
                  :tree-data="functionTree">
          </a-tree>
      </a-spin>
			<div style="text-align: center; padding: 0 10px; position: absolute; bottom: 10px; width: 100%">
          <a-button
	          type="primary"
	          @click="handleSaveMenu"
            block>保存</a-button>
			</div>
	</div>
	`
    };
    const basePage = {
        components: {
            RoleComponent,
            FunctionTree
        },
        data() {
            return {
                customRow: (record) => {
                    return {
                        on: {
                            click: () => this.handleClickRow(record)
                        }
                    };
                },
                currentRoleId: null
            };
        },
        methods: {
            handleClickRow({ roleId }) {
                this.currentRoleId = roleId;
            },
            handleRowClassName({ roleId }) {
                if (roleId === this.currentRoleId) {
                    return 'current-role';
                }
            }
        },
        template: `
	<div style="padding: 10px; height: 100%; background:  rgba(0, 21, 41, 0.08)">
			<a-layout class="full-height">
          <a-layout-content
          	style="background-color: white">
		          <RoleComponent
			          :rowClassName="handleRowClassName"
		            :customRow="customRow"/>
          </a-layout-content>
          <a-layout-sider
	          style="margin-left: 5px"
	          :width="260"
	          theme="light">
		          <a-layout class="full-height">
				          <a-layout-header style="background-color: white; text-align: center; border-bottom: #001529 solid">
                    <h3>菜单设置</h3>
				          </a-layout-header>
                  <a-layout-content style="background-color: white; padding-top: 5px">
                      <FunctionTree :roleId="currentRoleId"/>
                  </a-layout-content>
		          </a-layout>
          </a-layout-sider>
			</a-layout>
	</div>
	`
    };
});
