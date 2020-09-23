// @ts-ignore
import moduleLoader from 'js/common/utils/ModuleLoader'
// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'


import UserList from './components/UserList'



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
	components: {
		UserList
	},
	// language=html
	template: `
	<div style="padding: 10px; background:  rgba(0, 21, 41, 0.08)" >
      <div style="background: white; overflow:auto">
          <UserList/>
      </div>	
	</div>
	`
}
