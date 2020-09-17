var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "js/common/PageBuilder", "js/common/utils/ModuleLoader", "js/common/utils/DataApiService"], function (require, exports, PageBuilder_1, ModuleLoader_1, DataApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moment = window['moment'];
    var UserGroupManagerPage = (function (_super) {
        __extends(UserGroupManagerPage, _super);
        function UserGroupManagerPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UserGroupManagerPage.prototype.init = function () {
            var _this = this;
            ModuleLoader_1.default(['vue-ant-table']).then(function () {
                _this.initVue();
            });
        };
        UserGroupManagerPage.prototype.build = function () {
            return page;
        };
        return UserGroupManagerPage;
    }(PageBuilder_1.default));
    exports.default = UserGroupManagerPage;
    var page = {
        data: function () {
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
                            width: 120,
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
                        }
                    },
                    {
                        label: '是否启用',
                        prop: 'enable',
                        table: {
                            width: 120,
                            scopedSlots: { customRender: 'table-enable' },
                            sorter: true
                        },
                        type: 'boolean'
                    },
                    {
                        label: '序号',
                        prop: 'seq',
                        table: {
                            width: 120,
                            sorter: true
                        }
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
                            customRender: function (text) {
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
                            customRender: function (text) {
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
            handleShowSetUser: function (userGroup) {
                this.currentUserGroup = userGroup;
                this.loadAllUserList();
                this.loadGroupUser(userGroup.groupId);
                this.setUserModalVisible = true;
            },
            handleSetUser: function () {
                var _this = this;
                this.setUserLoading = true;
                DataApiService_1.default.postAjax('sys/userGroup/saveUserGroupByGroupId', {
                    groupId: this.currentUserGroup.groupId,
                    userIdList: this.selectUserIdList
                }).then(function () {
                    _this.selectUserIdList = [];
                    _this.setUserModalVisible = false;
                    _this.$message.success('设置用户成功');
                }).catch(function (error) {
                    console.error(error);
                    _this.$message.error('设置用户发生错误');
                }).finally(function () {
                    _this.setUserLoading = false;
                });
            },
            loadGroupUser: function (groupId) {
                var _this = this;
                DataApiService_1.default.postAjax('sys/userGroup/listUserIdById', groupId)
                    .then(function (data) {
                    _this.selectUserIdList = data.map(function (key) { return key + ''; });
                }).catch(function (error) {
                    console.error(error);
                    _this.message.error('加载用户列表失败');
                });
            },
            loadAllUserList: function () {
                var _this = this;
                if (this.allUserList.length === 0) {
                    DataApiService_1.default.postAjax('sys/user/list')
                        .then(function (data) {
                        _this.allUserList = data.map(function (item) {
                            return {
                                key: item.userId + '',
                                title: item.realname
                            };
                        });
                    }).catch(function (error) {
                        console.error(error);
                        _this.$message.error('加载用户列表失败');
                    });
                }
            },
            handleSelectUser: function (targetKeys) {
                this.selectUserIdList = targetKeys;
            }
        },
        template: "\n\t<div style=\"padding: 10px; background:  rgba(0, 21, 41, 0.08)\">\n\t\t\t<div style=\"background: white; overflow:auto\">\n          <s-table-crud\n          \t:keys=\"['groupId']\"\n            size=\"middle\"\n            :scroll=\"{ x: 1400 }\"\n            :columns=\"columns\"\n            :opreaColumnWidth=\"210\"\n            defaultSearchVisible\n\t          :rowSelection=\"{}\"\n            text-row-button\n\t          :deleteWarningHandler=\"() => '\u8BE5\u64CD\u4F5C\u4F1A\u540C\u65F6\u5220\u9664\u7528\u6237\u7EC4\u4E0E\u7528\u6237\u5173\u7CFB\uFF0C\u786E\u5B9A\u8981\u5220\u9664\u5417\uFF1F'\"\n\t          :leftButtonInGroup=\"false\"\n            :bordered=\"false\"\n            :api-service=\"apiService\"\n            query-url=\"sys/userGroup/list\"\n\t          delete-url=\"sys/userGroup/batchDeleteById\"\n            :pagination=\"{}\">\n\t\t          <template v-slot:table-enable=\"{ text }\">\n                  <a-tag :color=\"text ? '#108ee9' : '#f50'\">\n                      {{text ? '\u542F\u7528' : '\u7981\u7528'}}\n                  </a-tag>\n\t\t          </template>\n\t\t          <template v-slot:row-operation=\"{text, record}\">\n\t\t\t\t          <a-button @click=\"handleShowSetUser(record)\" type=\"link\">\u8BBE\u7F6E\u7528\u6237</a-button>\n\t\t          </template>\n          </s-table-crud>\n\n          <a-modal\n            title=\"\u8BBE\u7F6E\u7528\u6237\"\n            :confirm-loading=\"setUserLoading\"\n            @ok=\"handleSetUser\"\n            :width=\"450\"\n            @cancel=\"setUserModalVisible = false\"\n            :visible=\"setUserModalVisible\">\n              <a-transfer\n                show-search\n                @change=\"handleSelectUser\"\n                :render=\"item => item.title\"\n                :data-source=\"allUserList\"\n              \t:target-keys=\"selectUserIdList\"/>\n          </a-modal>\n\t\t\t</div>\n\t</div>\n\t"
    };
});
