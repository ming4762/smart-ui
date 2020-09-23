// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'
// @ts-ignore
import moduleLoader from 'js/common/utils/ModuleLoader'
// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'


let moment: Function = window['moment']
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
		return page
	}
}

const page = {
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
  <div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)">
		  <div style="background: white; overflow:auto">
          <s-table-crud
            :keys="['roleId']"
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
	</div>
	`
}