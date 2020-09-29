define(["require", "exports", "js/common/PageBuilder", "js/common/utils/ModuleLoader", "js/common/utils/DataApiService"], function (require, exports, PageBuilder_1, ModuleLoader_1, DataApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    DataApiService_1.default.init401ErrorHandler();
    let moment = window['moment'];
    class UserGroupManagerPage extends PageBuilder_1.default {
        init() {
            ModuleLoader_1.default(['vue-ant-table']).then(() => {
                this.initVue();
            });
        }
        build() {
            return page;
        }
    }
    exports.default = UserGroupManagerPage;
    const page = {
        components: {},
        data() {
            return {
                apiService: DataApiService_1.default,
                columns: [
                    {
                        label: 'ID',
                        prop: 'groupId',
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
                        label: '用户组名称',
                        prop: 'groupName',
                        table: {
                            width: 120,
                            fixed: true
                        },
                        search: {
                            symbol: 'like'
                        }
                    },
                    {
                        label: '用户组编码',
                        prop: 'groupCode',
                        table: {
                            width: 160,
                            fixed: true
                        },
                        search: {
                            symbol: 'like'
                        }
                    },
                    {
                        label: '备注',
                        prop: 'remark',
                        table: {
                            width: 200
                        },
                        type: 'textarea'
                    },
                    {
                        label: '是否启用',
                        prop: 'enable',
                        table: {
                            width: 120,
                            scopedSlots: { customRender: 'table-enable' },
                            sorter: true
                        },
                        form: {
                            defaultValue: true
                        },
                        type: 'boolean'
                    },
                    {
                        label: '序号',
                        prop: 'seq',
                        table: {
                            width: 120,
                            sorter: true
                        },
                        type: 'number'
                    },
                    {
                        label: '创建人员',
                        prop: 'createUserId',
                        table: {
                            width: 120,
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
                            width: 120,
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
                setUserModalVisible: false,
                setUserLoading: false,
                currentUserGroup: null,
                allUserList: [],
                selectUserIdList: []
            };
        },
        methods: {
            handleShowSetUser(userGroup) {
                this.currentUserGroup = userGroup;
                this.loadAllUserList();
                this.loadGroupUser(userGroup.groupId);
                this.setUserModalVisible = true;
            },
            handleSetUser() {
                this.setUserLoading = true;
                DataApiService_1.default.postAjax('sys/userGroup/saveUserGroupByGroupId', {
                    groupId: this.currentUserGroup.groupId,
                    userIdList: this.selectUserIdList
                }).then(() => {
                    this.selectUserIdList = [];
                    this.setUserModalVisible = false;
                    this.$message.success('设置用户成功');
                }).catch(error => {
                    console.error(error);
                    this.$message.error('设置用户发生错误');
                }).finally(() => {
                    this.setUserLoading = false;
                });
            },
            loadGroupUser(groupId) {
                DataApiService_1.default.postAjax('sys/userGroup/listUserIdById', groupId)
                    .then((data) => {
                    this.selectUserIdList = data.map(key => key + '');
                }).catch(error => {
                    console.error(error);
                    this.message.error('加载用户列表失败');
                });
            },
            loadAllUserList() {
                if (this.allUserList.length === 0) {
                    DataApiService_1.default.postAjax('sys/user/list')
                        .then(data => {
                        this.allUserList = data.map(item => {
                            return {
                                key: item.userId + '',
                                title: item.realname
                            };
                        });
                    }).catch(error => {
                        console.error(error);
                        this.$message.error('加载用户列表失败');
                    });
                }
            },
            handleSelectUser(targetKeys) {
                this.selectUserIdList = targetKeys;
            }
        },
        template: `
	<div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)">
			<div class="user-group" style="background: white; overflow:auto">
          <s-table-crud
                  :keys="['groupId']"
                  size="middle"
                  :scroll="{ x: 1400 }"
                  :columns="columns"
                  :opreaColumnWidth="330"
                  defaultSearchVisible
                  :rowSelection="{}"
                  text-row-button
                  :deleteWarningHandler="() => '该操作会同时删除用户组与用户关系，确定要删除吗？'"
                  :leftButtonInGroup="false"
                  :bordered="false"
                  defaultSortColumn="seq"
                  :api-service="apiService"
                  query-url="sys/userGroup/list"
                  delete-url="sys/userGroup/batchDeleteById"
                  saveUpdateUrl="sys/userGroup/saveUpdate"
                  :pagination="{}">
              <template v-slot:table-enable="{ text }">
                  <a-tag :color="text ? '#108ee9' : '#f50'">
                      {{text ? '启用' : '禁用'}}
                  </a-tag>
              </template>
              <template v-slot:row-operation="{text, record}">
                  <a-button @click="handleShowSetUser(record)" type="link">设置用户</a-button>
                  <a-button @click="handleShowSetRole(record)" type="link">设置角色</a-button>
              </template>
          </s-table-crud>

          <a-modal
                  title="设置用户"
                  :confirm-loading="setUserLoading"
                  @ok="handleSetUser"
                  :width="450"
                  @cancel="setUserModalVisible = false"
                  :visible="setUserModalVisible">
              <a-transfer
                      show-search
                      :list-style="{
									height: '500px'
								}"
                      @change="handleSelectUser"
                      :render="item => item.title"
                      :data-source="allUserList"
                      :target-keys="selectUserIdList"/>
          </a-modal>
			</div>
	</div>
	`
    };
});
