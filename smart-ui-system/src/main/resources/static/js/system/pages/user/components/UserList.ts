// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'

let moment: Function = window['moment']

DataApiService.init401ErrorHandler()

/**
 * 性别
 */
const sexMap: {[index: number]: string} = {
	1: '男',
	2: '女',
	3: '未知'
}
/**
 *
 * @author shizhongming
 * 2020/9/23 11:00 下午
 */
export default {
	data () {
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
						customRender: (text) => {
							if (text) {
								return moment(text).format('YYYY-MM-DD HH:MM')
							}
							return ''
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
						width: 170,
						customRender: (text) => {
							if (text) {
								return moment(text).format('YYYY-MM-DD HH:MM')
							}
							return ''
						},
						sorter: true,
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
						width: 170,
						customRender: (text) => {
							if (text) {
								return moment(text).format('YYYY-MM-DD HH:MM')
							}
							return ''
						},
						sorter: true,
						visible: false
					},
					form: {
						visible: false
					}
				}
			],
			apiService: DataApiService,
			sexMap: sexMap
		}
	},
	methods: {
		getSexColor (value) {
			if (value === 1) {
				return '#108ee9'
			}
			if (value === 2) {
				return '#f50'
			}
			return ''
		},
		getSexText (value) {
			if (value === 1) {
				return '男'
			}
			if (value === 2) {
				return '女'
			}
			return '未知'
		},
		getTableVue () {
			return this.$refs['table']
		}
	},
	// language=html
	template: `
  <s-table-crud
				  ref="table"
				  v-bind="$attrs"
          :keys="['userId']"
          size="middle"
          :pagination="{}"
          :addEditFormSpan="12"
          :opreaColumnWidth="140"
          :scroll="{ x: 1800 }"
          showIndex
          :api-service="apiService"
				  :url="{
				  	query: 'sys/user/list'
				  }"
          text-row-button
          :bordered="false"
          :columns="columns">
      <template v-slot:table-userSex="{ text }">
          <a-tag :color="getSexColor(text)">
              {{getSexText(text)}}
          </a-tag>
      </template>
      <template v-slot:form-sex="{}">
          <a-radio-group v-decorator="['sex']">
              <a-radio
                      v-for="(value, key) in sexMap"
                      :key="key"
                      :value="key">
                  {{value}}
              </a-radio>
          </a-radio-group>
      </template>
  </s-table-crud>
	`
}