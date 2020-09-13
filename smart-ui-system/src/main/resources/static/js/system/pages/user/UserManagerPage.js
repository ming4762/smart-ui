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
define(["require", "exports", "js/common/utils/ModuleLoader", "js/common/PageBuilder", "js/common/utils/PageListApiService"], function (require, exports, ModuleLoader_1, PageBuilder_1, PageListApiService_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moment = window['moment'];
    var UserManagerPage = (function (_super) {
        __extends(UserManagerPage, _super);
        function UserManagerPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        UserManagerPage.prototype.init = function () {
            var _this = this;
            ModuleLoader_1.default(['vue-ant-table']).then(function () {
                _this.initVue();
            });
        };
        UserManagerPage.prototype.build = function () {
            return page;
        };
        return UserManagerPage;
    }(PageBuilder_1.default));
    exports.default = UserManagerPage;
    var sexMap = {
        1: '男',
        2: '女',
        3: '未知'
    };
    var page = {
        data: function () {
            return {
                columns: [
                    {
                        label: '用户ID',
                        prop: 'userId',
                        table: {
                            visible: false,
                            config: false
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '用户名',
                        prop: 'username',
                        table: {
                            width: 120,
                            fixed: true
                        }
                    },
                    {
                        label: '姓名',
                        prop: 'realname',
                        table: {
                            width: 120,
                            fixed: true
                        }
                    },
                    {
                        label: '邮箱',
                        prop: 'email',
                        table: {
                            width: 220
                        }
                    },
                    {
                        label: '手机',
                        prop: 'mobile',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '电话',
                        prop: 'telephone',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '性别',
                        prop: 'sex',
                        table: {
                            width: 80,
                            scopedSlots: { customRender: 'table-userSex' },
                            sorter: true
                        }
                    },
                    {
                        label: '生日',
                        prop: 'birthday',
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
                        type: 'date-picker'
                    },
                    {
                        label: '部门',
                        prop: 'deptId',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '状态',
                        prop: 'status',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '用户类型',
                        prop: 'userType',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '职务',
                        prop: 'postId',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '工号',
                        prop: 'workNo',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '序号',
                        prop: 'seq',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '创建人员',
                        prop: 'createUserId',
                        table: {
                            width: 120,
                            visible: false
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '创建时间',
                        prop: 'createTime',
                        table: {
                            width: 120,
                            visible: false
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
                            visible: false
                        },
                        form: {
                            visible: false
                        }
                    },
                    {
                        label: '更新时间',
                        prop: 'updateTime',
                        table: {
                            width: 120,
                            visible: false
                        },
                        form: {
                            visible: false
                        }
                    }
                ],
                apiService: PageListApiService_1.default,
                sexMap: sexMap
            };
        },
        methods: {
            getSexColor: function (value) {
                if (value === 1) {
                    return '#108ee9';
                }
                if (value === 2) {
                    return '#f50';
                }
                return '';
            },
            getSexText: function (value) {
                if (value === 1) {
                    return '男';
                }
                if (value === 2) {
                    return '女';
                }
                return '未知';
            },
            createDate: function () {
                return moment();
            }
        },
        template: "\n\t<div style=\"padding: 10px; background:  rgba(0, 21, 41, 0.08)\" >\n      <div style=\"height: 1000px; background: white; overflow:auto\">\n          <s-table-crud\n          \t:keys=\"['userId']\"\n\t          size=\"middle\"\n            :pagination=\"{}\"\n\t          :addEditFormSpan=\"12\"\n            :opreaColumnWidth=\"140\"\n            :scroll=\"{ x: 1800 }\"\n            showIndex\n\t          :api-service=\"apiService\"\n            query-url=\"sys/user/list\"\n            text-row-button\n\t          :bordered=\"false\"\n            :columns=\"columns\">\n\t\t          <template v-slot:table-userSex=\"{ text }\">\n                  <a-tag :color=\"getSexColor(text)\">\n                      {{getSexText(text)}}\n                  </a-tag>\n\t\t          </template>\n\t\t          <template v-slot:form-birthday11=\"{}\">\n                  <a-date-picker v-decorator=\"['birthday11', {\n                  \tinitialValue: createDate()\n                  }]\" />\n\t\t          </template>\n\t\t          <template v-slot:form-sex=\"{}\">\n\t\t\t\t          <a-radio-group v-decorator=\"['sex']\">\n\t\t\t\t\t\t          <a-radio\n\t\t\t\t\t\t\t          v-for=\"(value, key) in sexMap\"\n\t\t\t\t\t\t\t          :key=\"key\"\n\t\t\t\t\t\t          \t:value=\"key\">\n\t\t\t\t\t\t\t\t          {{value}}\n\t\t\t\t\t\t          </a-radio>\n\t\t\t\t          </a-radio-group>\n\t\t          </template>\n          </s-table-crud>\n      </div>\t\n\t</div>\n\t"
    };
});
