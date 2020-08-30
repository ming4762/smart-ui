// @ts-ignore
import PageBuilder from 'common/PageBuilder'
import initBus from 'system/SysBus'

import BasicLayout from 'system/layout/BasicLayout'

declare global {
    interface Window {
        busVue: any
    }
}

/**
 *
 * @author shizhongming
 * 2020/8/29 7:51 下午
 */
export default class HomePage extends PageBuilder {

    /**
     * 初始化页面
     */
    public initPage () {
        // 初始化bus
        window['busVue'] = initBus()
        // @ts-ignore
        this.init()
    }

    protected build () {
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