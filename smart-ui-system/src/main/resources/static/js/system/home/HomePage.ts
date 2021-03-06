// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'
import initBus from 'js/system/SysBus'
// @ts-ignore
import DataApiService from 'js/common/utils/DataApiService'

import BasicLayout from 'js/system/layout/BasicLayout'

declare global {
	interface Window {
		busVue: any
	}
}

// DataApiService.validateLogin()

/**
 *
 * @author shizhongming
 * 2020/8/29 7:51 下午
 */
export default class HomePage extends PageBuilder {

	/**
	 * 初始化页面
	 */
	public initPage() {
		DataApiService.validateLogin(false).then(() => {
			// 初始化bus
			window['busVue'] = initBus()
			// @ts-ignore
			this.init()
		})
	}

	protected build() {
		return page
	}
}

const page = {
	components: {
		BasicLayout: BasicLayout
	},
	// language=html
	template: `
      <div class="full-height">
          <BasicLayout/>
      </div>
	`
}
