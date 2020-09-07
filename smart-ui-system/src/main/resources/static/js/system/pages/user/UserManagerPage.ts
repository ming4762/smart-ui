// @ts-ignore
import moduleLoader from 'js/common/utils/ModuleLoader'
// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'
// @ts-ignore
import ApiService from 'js/common/utils/ApiService'

/**
 * 用户管理页面
 */
export default class UserManagerPage extends PageBuilder {

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

/**
 * 页面信息
 */
const page = {
	data () {
		return {
			columns: [
				{
					label: '用户名',
					prop: 'username'
				}
			],
			apiService: ApiService
		}
	},
	// language=html
	template: `
	<div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)" >
      <div style="height: 1000px; background: white; overflow:auto">
          <s-table-crud
          	:keys="['userId']"
	          size="middle"
            showIndex
	          :api-service="apiService"
            query-url="sys/user/list"
            text-row-button
	          :bordered="false"
            :columns="columns"></s-table-crud>
      </div>	
	</div>
	`
}
