import CommonUtils from './CommonUtils'

/**
 * 定义全局windows
 */
declare global {
    interface Window {
        loadMoules: Array<string>
        smartModuleLoader: Function
    }
}
/**
 * 定义模块类型
 */
interface Module {
    name: string
    js: Array<any>
    css?: Array<any>
}

const moduleMap: {[key: string]: Module} = {
    'vue-echarts': {
        name: 'vue-echarts',
        js: [
            'echarts/4.2.1/echarts.min.js',
            'js/plugins/vue-echarts/vue-echarts.umd.min.js'
        ]
    },
}


/**
 * 获取路径
 * @param path
 */
const getPath = CommonUtils.withContextPath
/**
 * 加载模块
 * @param moduleName
 */
const loadModule = (moduleName: string): Promise<any> => {
    // 获取模块信息
    const module = moduleMap[moduleName]
    if (!module) {
        console.warn('模块加载失败，未找到模块')
        return new Promise<any>(resolve => resolve(null))
    }
    // 加载css
    if (module['css'] && module['css'].length > 0) {
        const cssPaths = module['css'].map(item =>  {
            return getPath(item)
        })
        CommonUtils.loadCSS(...cssPaths)
    }
    // 加载js
    const jsList = module.js.map(item => getPath(item))
    return CommonUtils.loadJS(...jsList)
}

window.loadMoules = []

/**
 * 模块加载器
 * @param moduleNames
 */
window.smartModuleLoader = async (...moduleNames: Array<string>): Promise<any> => {
    for (let moduleName of moduleNames) {
        if (window['loadMoules'].indexOf(moduleName) === -1) {
            await loadModule(moduleName)
            window['loadMoules'].push(moduleName)
        } else {
            console.warn(`${moduleName}已加载，请勿重复加载`)
        }
    }
}