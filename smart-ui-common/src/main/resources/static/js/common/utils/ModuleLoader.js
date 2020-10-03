var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports", "./CommonUtils"], function (require, exports, CommonUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const moduleMap = {
        'vue-echarts': {
            name: 'vue-echarts',
            js: [
                'echarts/4.2.1/echarts.min.js',
                'js/plugins/vue-echarts/vue-echarts.umd.min.js'
            ]
        },
        'vue-ant-table': {
            name: 'vue-ant-table',
            js: [
                'plugins/vue-ant-table/vue-ant-table.umd.min'
            ],
            css: [
                'plugins/vue-ant-table/vue-ant-table.css'
            ]
        },
        'moment': {
            name: 'moment',
            js: [
                'library/moment/2.24.0/moment.min'
            ]
        }
    };
    const getPath = (path) => {
        return `${contextPath}/js/${path}`;
    };
    const loadModule = (moduleName, amd = true) => {
        const module = moduleMap[moduleName];
        if (!module) {
            console.warn('模块加载失败，未找到模块');
            return new Promise(resolve => resolve(null));
        }
        if (module['css'] && module['css'].length > 0) {
            const cssPaths = module['css'].map(item => {
                return `${contextPath}${item}`;
            });
            CommonUtils_1.default.loadCSS(...cssPaths);
        }
        if (module.js.length === 0) {
            return new Promise(() => { });
        }
        if (!amd) {
            const jsList = module.js.map(item => getPath(item));
            return CommonUtils_1.default.loadJS(...jsList);
        }
        else {
            return Promise.all(module.js.map(item => {
                return new Promise((resolve_1, reject_1) => { require([item], resolve_1, reject_1); });
            }));
        }
    };
    window.loadMoules = [];
    const moduleLoader = (moduleNames, amd = true) => __awaiter(void 0, void 0, void 0, function* () {
        const promises = [];
        for (let moduleName of moduleNames) {
            if (window['loadMoules'].indexOf(moduleName) === -1) {
                window['loadMoules'].push(moduleName);
                promises.push(loadModule(moduleName));
            }
            else {
                console.warn(`${moduleName}已加载，请勿重复加载`);
            }
        }
        return Promise.all(promises);
    });
    window.smartModuleLoader = moduleLoader;
    exports.default = moduleLoader;
});
