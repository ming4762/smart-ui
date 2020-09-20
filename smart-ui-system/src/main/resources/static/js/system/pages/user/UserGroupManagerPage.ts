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
 * 2020/9/15 11:00 下午
 */
export default class UserGroupManagerPage extends PageBuilder {
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
			apiService: DataApiService,
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
			setUserModalVisible: false,
			// 设置用户加载状态
			setUserLoading: false,
			currentUserGroup: null,
			// 所有用户列表
			allUserList: [],
			// 用户ID列表
			selectUserIdList: []
		}
	},
	methods: {
		/**
		 * 显示设置用户弹窗
		 */
		handleShowSetUser (userGroup: any) {
			this.currentUserGroup = userGroup
			// 加载所有用户信息
			this.loadAllUserList()
			this.loadGroupUser(userGroup.groupId)
			this.setUserModalVisible = true
		},
		/**
		 * 设置用户
		 */
		handleSetUser () {
			this.setUserLoading = true
			DataApiService.postAjax('sys/userGroup/saveUserGroupByGroupId', {
				groupId: this.currentUserGroup.groupId,
				userIdList: this.selectUserIdList
			}).then(() => {
				this.selectUserIdList = []
				this.setUserModalVisible = false
				this.$message.success('设置用户成功')
			}).catch(error => {
				console.error(error)
				this.$message.error('设置用户发生错误')
			}).finally(() => {
				this.setUserLoading = false
			})
		},
		/**
		 * 加载用户组包含的用户
		 */
		loadGroupUser (groupId: number) {
			DataApiService.postAjax('sys/userGroup/listUserIdById', groupId)
				.then((data) => {
					this.selectUserIdList = data.map(key => key + '')
				}).catch(error => {
				console.error(error)
				this.message.error('加载用户列表失败')
			})
		},
		loadAllUserList () {
			if (this.allUserList.length === 0) {
				DataApiService.postAjax('sys/user/list')
					.then(data => {
						this.allUserList = data.map(item => {
							return {
								key: item.userId + '',
								title: item.realname
							}
						})
					}).catch(error => {
						console.error(error)
					this.$message.error('加载用户列表失败')
				})
			}
		},
		/**
		 * 穿梭框变化触发
		 * @param targetKeys
		 */
		handleSelectUser (targetKeys) {
			this.selectUserIdList = targetKeys
		}
	},
	// language=html
	template: `
	<div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)">
			<div style="background: white; overflow:auto">
          <s-table-crud
          	:keys="['groupId']"
            size="middle"
            :scroll="{ x: 1400 }"
            :columns="columns"
            :opreaColumnWidth="210"
            defaultSearchVisible
	          :rowSelection="{}"
            text-row-button
	          :deleteWarningHandler="() => '该操作会同时删除用户组与用户关系，确定要删除吗？'"
	          :leftButtonInGroup="false"
            :bordered="false"
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
}