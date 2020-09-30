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

const statusDict = Object.freeze(
	[
		{
			key: '10',
			value: '启用',
			color: '#108ee9'
		},
		{
			key: '20',
			value: '禁用',
			color: '#f50'
		}
	]
)

const typeDict = Object.freeze([
	{
		key: '10',
		value: '系统用户',
		color: '#108ee9'
	},
	{
		key: '20',
		value: '业务用户',
		color: '#f50'
	}
])

/**
 *
 * @author shizhongming
 * 2020/9/23 11:00 下午
 */
export default {
	data () {
		const sexDict = Object.keys(sexMap).map(key => {
			return {
				key: key + '',
				value: sexMap[key]
			}
		})
		const statusDictMap = {}
		statusDict.forEach(item => {
			statusDictMap[item.key] = item
		})
		const typeDictMap = {}
		typeDict.forEach(item => {
			typeDictMap[item.key] = item
		})
		return {
			statusDictMap: statusDictMap,
			typeDictMap: typeDictMap,
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
					},
					form: {
						dict: sexDict,
						defaultValue: '3'
					},
					type: 'radio'
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
						width: 120,
						scopedSlots: { customRender: 'table-status' },
						sorter: true
					},
					form: {
						defaultValue: '10',
						dict: statusDict
					},
					type: 'radio'
				},
				{
					label: '用户类型',
					prop: 'userType',
					table: {
						width: 120,
						scopedSlots: { customRender: 'table-userType' },
						sorter: true
					},
					form: {
						defaultValue: '10',
						dict: typeDict
					},
					type: 'radio'
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
					},
					type: 'number',
					form: {
						defaultValue: 1
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
			sexMap: sexMap,
			currentUser: null,
			setRoleModalVisible: false,
			setRoleLoading: false,
			// 角色列表
			roleList: [],
			selectedRoleIdList: []
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
		},
		/**
		 * 显示设置角色
		 * @param record
		 */
		handleShowSetRole (record) {
			this.currentUser = record
			this.loadAllRole()
			this.loadRoleByUser(record.userId)
			this.setRoleModalVisible = true
		},
		/**
		 * 设置角色
		 */
		handleSetRole () {
			this.setRoleLoading = true
			const { selectedRoleIdList, currentUser: { userId } } = this
			DataApiService.postAjax('sys/user/setRole', {
				userId: userId,
				roleIdList: selectedRoleIdList
			}).then(data => {
				this.selectedRoleIdList = []
				this.$message.success('设置角色成功')
				this.setRoleModalVisible = false
			}).catch(error => {
				console.error(error)
				this.$message.error('设置角色发生错误')
			}).finally(() => {
				this.setRoleLoading = false
			})
		},
		/**
		 * 加载用户的角色信息
		 * @param userId
		 */
		loadRoleByUser (userId: number) {
			DataApiService.postAjax('sys/user/listRoleId', userId)
				.then(data => {
					this.selectedRoleIdList = data.map(item => item + '')
				}).catch(error => {
					console.error(error)
					this.$message.error('加载用户角色失败' + error.message)
			})
		},
		/**
		 * 加载所有角色信息
		 */
		loadAllRole () {
			if (this.roleList.length === 0) {
				DataApiService.postAjax('sys/role/list')
					.then(data => {
						this.roleList = data.map(({ roleId, roleName }) => {
							return {
								key: roleId + '',
								title: roleName
							}
						})
					}).catch(error => {
						console.error(error)
						this.$message.error('加载角色列表失败', error.message)
				})
			}
		},
		handleSelectRole (targetKeys) {
			this.selectedRoleIdList = targetKeys
		}
	},
	// language=html
	template: `					
	<div>
	  <s-table-crud
					  ref="table"
					  v-bind="$attrs"
	          :keys="['userId']"
	          size="middle"
	          :pagination="{}"
	          :addEditFormSpan="12"
	          :opreaColumnWidth="220"
	          :scroll="{ x: 1800 }"
	          showIndex
	          :api-service="apiService"
					  :url="{
					    query: 'sys/user/list',
					    save: 'sys/user/save',
					    update: 'sys/user/update',
					    delete: 'sys/user/batchDeleteById'
					  }"
	          text-row-button
	          :bordered="false"
	          :columns="columns">
	      <template v-slot:table-userSex="{ text }">
	          <a-tag :color="getSexColor(text)">
	              {{getSexText(text)}}
	          </a-tag>
	      </template>
			  <template v-slot:table-status="{ text }">
	          <a-tag :color="statusDictMap[text].color">
	              {{statusDictMap[text].value}}
	          </a-tag>
			  </template>
			  <template v-slot:table-userType="{ text }">
	          <a-tag :color="typeDictMap[text].color">
	              {{typeDictMap[text].value}}
	          </a-tag>
			  </template>
			  <template v-slot:row-operation="{record}">
					  <a-button @click="handleShowSetRole(record)" type="link">设置角色</a-button>
			  </template>
	  </s-table-crud>
	  <a-modal
	          title="设置角色"
	          :confirm-loading="setRoleLoading"
	          :width="450"
	          @ok="handleSetRole"
	          @cancel="setRoleModalVisible = false"
	          :visible="setRoleModalVisible">
	      <a-transfer
          :list-style="{
						height: '400px'
					}"
          @change="handleSelectRole"
          :render="item => item.title"
          :target-keys="selectedRoleIdList"
          :data-source="roleList"
          show-search/>
	  </a-modal>
  </div>
	`
}