define(["require", "exports", "js/common/PageBuilder", "js/common/utils/ModuleLoader", "js/common/utils/DataApiService", "js/common/utils/TreeUtils"], function (require, exports, PageBuilder_1, ModuleLoader_1, DataApiService_1, TreeUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    let moment = window['moment'];
    class FunctionManagerPage extends PageBuilder_1.default {
        init() {
            ModuleLoader_1.default(['vue-ant-table']).then(() => {
                this.initVue();
            });
        }
        build() {
            return page;
        }
    }
    exports.default = FunctionManagerPage;
    const FUNCTION_TYPE = {
        '10': {
            name: '目录',
            color: '#f50'
        },
        '20': {
            name: '菜单',
            color: '#2db7f5'
        },
        '30': {
            name: '功能',
            color: '#108ee9'
        }
    };
    const page = {
        data() {
            const functionTypes = {};
            Object.keys(FUNCTION_TYPE).forEach(key => {
                functionTypes[key] = FUNCTION_TYPE[key].name;
            });
            return {
                columns: [
                    {
                        label: '功能id',
                        prop: 'functionId',
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
                        label: '上级',
                        prop: 'parentId',
                        table: {
                            visible: false,
                            config: false
                        }
                    },
                    {
                        label: '功能名称',
                        prop: 'functionName',
                        table: {
                            width: 160,
                            fixed: true
                        },
                        form: {
                            rules: true
                        }
                    },
                    {
                        label: '图标',
                        prop: 'icon',
                        table: {
                            width: 120,
                            scopedSlots: { customRender: 'table-icon' }
                        }
                    },
                    {
                        label: '功能类型',
                        prop: 'functionType',
                        table: {
                            width: 120,
                            scopedSlots: { customRender: 'table-functionType' }
                        },
                        form: {
                            rules: true,
                            defaultValue: '10'
                        }
                    },
                    {
                        label: 'URL',
                        prop: 'url',
                        table: {
                            width: 200,
                            ellipsis: true
                        }
                    },
                    {
                        label: '权限',
                        prop: 'permission',
                        table: {
                            width: 120
                        }
                    },
                    {
                        label: '序号',
                        prop: 'seq',
                        table: {
                            width: 120,
                            sorter: true
                        },
                        type: 'number',
                        form: {
                            defaultValue: 1
                        }
                    },
                    {
                        label: '是否菜单',
                        prop: 'menuIs',
                        table: {
                            width: 120
                        },
                        form: {
                            defaultValue: true
                        },
                        type: 'boolean'
                    },
                    {
                        label: '外链菜单',
                        prop: 'internalOrExternal',
                        table: {
                            width: 120
                        },
                        form: {
                            placeholder: '外链菜单打开方式',
                        },
                        type: 'boolean'
                    },
                    {
                        label: '数据权限',
                        prop: 'dataRule',
                        table: {
                            width: 120
                        },
                        type: 'boolean'
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
                apiService: DataApiService_1.default,
                functionType: functionTypes,
                parentName: ''
            };
        },
        methods: {
            handleError(message, error) {
                this.$message.error(message);
                console.error(error);
            },
            handleAddEditDialogShow(ident, model, callBack, row) {
                if (ident === 'add') {
                    const formModel = Object.assign({}, model);
                    if (!row) {
                        formModel.parentId = '0';
                        this.parentName = '根目录';
                    }
                    else {
                        formModel.parentId = row.functionId;
                        this.parentName = row.functionName;
                    }
                    callBack(formModel);
                }
                else {
                    this.getModelById(row.functionId, callBack);
                }
            },
            getModelById(functionId, callBack) {
                DataApiService_1.default.postAjax('sys/function/getById', functionId)
                    .then(data => {
                    callBack(data);
                }).catch(error => {
                    console.error(error);
                    this.$message.error('通过ID获取功能失败');
                });
            },
            handleAddEditModalProps({ isAdd, tableName }) {
                return {
                    title: `${isAdd ? '添加' : '修改'}${tableName ? tableName : ''}`,
                    width: 800
                };
            },
            handleTableDataFormatter(tableData) {
                if (tableData.length > 0) {
                    return TreeUtils_1.default.convertList2Tree(tableData, ['functionId', 'parentId'], 0);
                }
                return [];
            },
            getFunctionTypeColor(functionTypeKey) {
                const functionType = FUNCTION_TYPE[functionTypeKey];
                if (functionType) {
                    return functionType.color;
                }
            },
            getFunctionTypeName(functionTypeKey) {
                const functionType = FUNCTION_TYPE[functionTypeKey];
                if (functionType) {
                    return functionType.name;
                }
            }
        },
        template: `
  <div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)">
		  <div style="background: white; overflow:auto">
          <s-table-crud
	          size="middle"
            :columns="columns"
            :scroll="{ x: 1400 }"
            :rowSelection="{}"
	          :addEditModalProps="handleAddEditModalProps"
            text-row-button
	          :defaultButtonConfig="{
	          	add: {
	          		rowShow: true
	          	}
	          }"
            :addEditFormSpan="12"
            defaultSortColumn="seq"
	          :tableDataFormatter="handleTableDataFormatter"
	          @add-edit-dialog-show="handleAddEditDialogShow"
            :bordered="false"
	          :errorHandler="handleError"
            :api-service="apiService"
            defaultSearchVisible
            query-url="sys/function/list"
            delete-url="sys/function/batchDeleteById"
            saveUpdateUrl="sys/function/saveUpdate"
          	:keys="['functionId']">
		          <template v-slot:table-icon="{text}">
				          <a-icon v-if="text" :type="text"/>
		          </template>
		          <template v-slot:table-functionType="{text}">
				          <a-tag :color="getFunctionTypeColor(text)">{{getFunctionTypeName(text)}}</a-tag>
		          </template>
		          <template v-slot:form-parentId="{}"">
				          <a-input v-decorator="['parentId']" v-show="false"/>
				          <a-input disabled :value="parentName"></a-input>
		          </template>
		          <template v-slot:form-functionType="{}">
				          <a-radio-group v-decorator="[
				          'functionType',
				          { rules: [{ required: true, message: '请选择功能类型' }] }
				          ]">
						          <a-radio
							          :value="key"
							          :key="key"
							          v-for="(value, key) in functionType">
								          {{value}}
						          </a-radio>
				          </a-radio-group>
		          </template>
          </s-table-crud>
		  </div>
	</div>
	`
    };
});
