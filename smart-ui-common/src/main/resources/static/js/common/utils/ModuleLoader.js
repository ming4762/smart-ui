var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
define(["require", "exports", "./CommonUtils"], function (require, exports, CommonUtils_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var moduleMap = {
        'vue-echarts': {
            name: 'vue-echarts',
            js: [
                'echarts/4.2.1/echarts.min.js',
                'js/plugins/vue-echarts/vue-echarts.umd.min.js'
            ]
        },
    };
    var getPath = CommonUtils_1.default.withContextPath;
    var loadModule = function (moduleName) {
        var module = moduleMap[moduleName];
        if (!module) {
            console.warn('模块加载失败，未找到模块');
            return new Promise(function (resolve) { return resolve(null); });
        }
        if (module['css'] && module['css'].length > 0) {
            var cssPaths = module['css'].map(function (item) {
                return getPath(item);
            });
            CommonUtils_1.default.loadCSS.apply(CommonUtils_1.default, cssPaths);
        }
        var jsList = module.js.map(function (item) { return getPath(item); });
        return CommonUtils_1.default.loadJS.apply(CommonUtils_1.default, jsList);
    };
    window.loadMoules = [];
    window.smartModuleLoader = function () {
        var moduleNames = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            moduleNames[_i] = arguments[_i];
        }
        return __awaiter(void 0, void 0, void 0, function () {
            var _a, moduleNames_1, moduleName;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = 0, moduleNames_1 = moduleNames;
                        _b.label = 1;
                    case 1:
                        if (!(_a < moduleNames_1.length)) return [3, 5];
                        moduleName = moduleNames_1[_a];
                        if (!(window['loadMoules'].indexOf(moduleName) === -1)) return [3, 3];
                        return [4, loadModule(moduleName)];
                    case 2:
                        _b.sent();
                        window['loadMoules'].push(moduleName);
                        return [3, 4];
                    case 3:
                        console.warn(moduleName + "\u5DF2\u52A0\u8F7D\uFF0C\u8BF7\u52FF\u91CD\u590D\u52A0\u8F7D");
                        _b.label = 4;
                    case 4:
                        _a++;
                        return [3, 1];
                    case 5: return [2];
                }
            });
        });
    };
});
