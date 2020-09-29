// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'
// @ts-ignore
import moduleLoader from 'js/common/utils/ModuleLoader'
// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'
// @ts-ignore
import CommonUtils from 'js/common/utils/CommonUtils'
// @ts-ignore
import TreeUtils from 'js/common/utils/TreeUtils'

DataApiService.init401ErrorHandler()


let moment: Function = window['moment']


CommonUtils.addCSS(
	// language=css
	`
	.ant-table-row.current-role {
			background-color: oldlace;
	}
	`
)

/**
 *
 * @author shizhongming
 * 2020/9/21 9:48 下午
 */
export default class RoleManagePage extends PageBuilder {
	public init (): void {
		moduleLoader(['vue-ant-table']).then(() => {
			// @ts-ignore
			this.initVue()
		})
	}

	public build () {
		return basePage
	}
}

const RoleComponent = {
	data () {
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
					form: {
					}
				},
				{
					label: '备注',
					prop: 'remark',
					table: {
						width: 120,
						ellipsis: true
					},
					form: {
					}
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
								return moment(text).format('YYYY-MM-DD HH:MM')
							}
							return ''
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
								return moment(text).format('YYYY-MM-DD HH:MM')
							}
							return ''
						},
						sorter: true
					},
					form: {
						visible: false
					}
				}
			],
			apiService: DataApiService,
		}
	},
	// language=html
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
}

const FunctionTree = {
	props: {
		roleId: null
	},
	data () {
		return {
			functionTree: [],
			treeLoading: false,
			replaceFields: {
				key: 'functionId',
				title: 'functionName'
			},
			treeModel: []
		}
	},
	mounted () {
		this.loadFunctionTree()
	},
	watch: {
		roleId (_new) {
			if (!!_new) {
				// 加载功能信息
				this.treeLoading = true
				DataApiService.postAjax('sys/role/listFunctionId', _new)
					.then(data => {
						this.treeModel = data
					}).catch(error => {
						console.error(error)
						this.$message.error('加载角色菜单列表失败')
				}).finally(() => {
					this.treeLoading = false
				})
			}
		}
	},
	methods: {
		/**
		 * 加载功能树
		 */
		loadFunctionTree () {
			this.treeLoading = true
			DataApiService.postAjax('sys/function/list')
				.then(data => {
					this.functionTree = TreeUtils.convertList2Tree(
						data,
						['functionId', 'parentId'],
						0
					)
				}).catch(error => {
					console.error(error)
					this.$message.error('加载功能树失败' + error.message)
			}).finally(() => {
				this.treeLoading = false
			})
		},
		/**
		 * 保存角色信息
		 */
		handleSaveMenu () {
			if (Array.isArray(this.treeModel)) {
				return false;
			}
			const { roleId, treeModel: { checked: functionIdList}  } = this
			this.treeLoading = true
			DataApiService.postAjax('sys/role/saveRoleMenu', {
				roleId, functionIdList
			}).then(data => {
				this.$message.success('保存成功')
			}).catch(error => {
				console.error(error)
				this.$message.error('保存菜单失败:' + error.message)
			}).finally(() => {
				this.treeLoading = false
			})
		}
	},
	// language=html
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
}

const basePage = {
	components: {
		RoleComponent,
		FunctionTree
	},
	data () {
		return {
			customRow: (record) => {
				return {
					on: {
						click: () => this.handleClickRow(record)
					}
				}
			},
			// 点中的role
			currentRoleId: null
		}
	},
	methods: {
		handleClickRow ({ roleId }) {
			this.currentRoleId = roleId
		},
		handleRowClassName ({ roleId }) {
			if ( roleId === this.currentRoleId) {
				return 'current-role'
			}
		}
	},
	// language=html
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
	          :width="350"
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
}