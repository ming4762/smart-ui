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

declare const contextPath: string

/**
 * 定义模块类型
 */
interface Module {
	name: string
	js: Array<any>
	css?: Array<any>
}

const moduleMap: { [key: string]: Module } = {
	'vue-echarts': {
		name: 'vue-echarts',
		js: [
			'echarts/4.2.1/echarts.min.js',
			'js/plugins/vue-echarts/vue-echarts.umd.min.js'
		]
	},
	'vue-ant-table': {
		name: 'ue-ant-table',
		js: [
			'/../../plugins/vue-ant-table/vue-ant-table.umd.js'
		],
		css: [
		  'plugins/vue-ant-table/vue-ant-table.css'
    ]
	}
}


/**
 * 获取路径
 * @param path
 */
const getPath = (path: string): string => {
	return `${contextPath}/js/${path}`
}
/**
 * 加载模块
 * @param moduleName
 * @param amd
 */
const loadModule = (moduleName: string, amd: boolean = true): Promise<any> => {
	// 获取模块信息
	const module = moduleMap[moduleName]
	if (!module) {
		console.warn('模块加载失败，未找到模块')
		return new Promise<any>(resolve => resolve(null))
	}
	// 加载css
	if (module['css'] && module['css'].length > 0) {
		const cssPaths = module['css'].map(item => {
			return `${contextPath}${item}`
		})
		CommonUtils.loadCSS(...cssPaths)
	}
	if (module.js.length === 0) {
		return new Promise<any>(()=>{})
	}
	// 加载js
	if (!amd) {
		const jsList = module.js.map(item => getPath(item))
		return CommonUtils.loadJS(...jsList)
	} else {
		return Promise.all(
			module.js.map(item => {
				return import(item)
			})
		)
	}
}

window.loadMoules = []


/**
 * 加载模块
 * @param moduleNames 模块名称
 * @param amd 是否使用amd规范
 */
const moduleLoader = async (moduleNames: Array<string>, amd: boolean = true): Promise<any> => {
	const promises = []
	for (let moduleName of moduleNames) {
		if (window['loadMoules'].indexOf(moduleName) === -1) {
			window['loadMoules'].push(moduleName)
			promises.push(loadModule(moduleName))
		} else {
			console.warn(`${moduleName}已加载，请勿重复加载`)
		}
	}
	return Promise.all(promises)
}
/**
 * 模块加载器
 * @param moduleNames
 */
window.smartModuleLoader = moduleLoader

export default moduleLoader