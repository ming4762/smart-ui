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
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var CommonUtils = (function () {
        function CommonUtils() {
        }
        CommonUtils.createUUID = function () {
            var s = [];
            var hexDigits = '0123456789abcdef';
            for (var i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';
            return s.join('');
        };
        CommonUtils.clone = function (object) {
            if (object == null) {
                return null;
            }
            var objectStr = JSON.stringify(object);
            return JSON.parse(objectStr);
        };
        CommonUtils.getObjectByKeys = function (keys, objectList) {
            if (objectList && keys) {
                var resultList_1 = [];
                objectList.forEach(function (object) {
                    var result = {};
                    keys.forEach(function (key) {
                        result[key] = object[key];
                    });
                    resultList_1.push(result);
                });
                return resultList_1;
            }
            return [];
        };
        CommonUtils.fullScreen = function (full) {
            if (full) {
                this.inFullScreen();
            }
            else {
                this.exitFullscreen();
            }
        };
        CommonUtils.inFullScreen = function () {
            var element = document.documentElement;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            }
            else if (element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
            else if (element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            }
            else if (element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            }
        };
        CommonUtils.exitFullscreen = function () {
            var doc = document;
            if (doc.exitFullscreen) {
                doc.exitFullscreen();
            }
            else if (doc.msExitFullscreen) {
                doc.msExitFullscreen();
            }
            else if (doc.mozCancelFullScreen) {
                doc.mozCancelFullScreen();
            }
            else if (doc.webkitExitFullscreen) {
                doc.webkitExitFullscreen();
            }
        };
        CommonUtils.loadJS = function () {
            var urls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                urls[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var promiseList;
                var _this = this;
                return __generator(this, function (_a) {
                    promiseList = urls.map(function (item) {
                        return _this.doLoadJS(item);
                    });
                    return [2, Promise.all(promiseList)];
                });
            });
        };
        CommonUtils.loadJSAsync = function () {
            var urls = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                urls[_i] = arguments[_i];
            }
            for (var _a = 0, urls_1 = urls; _a < urls_1.length; _a++) {
                var url = urls_1[_a];
                this.doLoadJS(url);
            }
        };
        CommonUtils.doLoadJS = function (url) {
            return new Promise(function (resolve) {
                var script = document.createElement('script');
                script.type = 'text/javascript';
                script.onload = function () {
                    resolve();
                };
                script.src = url;
                document.body.appendChild(script);
            });
        };
        CommonUtils.loadCSS = function () {
            var hrefs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                hrefs[_i] = arguments[_i];
            }
            return __awaiter(this, void 0, void 0, function () {
                var _a, hrefs_1, href;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _a = 0, hrefs_1 = hrefs;
                            _b.label = 1;
                        case 1:
                            if (!(_a < hrefs_1.length)) return [3, 4];
                            href = hrefs_1[_a];
                            return [4, this.doLoadCSS(href)];
                        case 2:
                            _b.sent();
                            _b.label = 3;
                        case 3:
                            _a++;
                            return [3, 1];
                        case 4: return [2];
                    }
                });
            });
        };
        CommonUtils.loadCSSAsync = function () {
            var hrefs = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                hrefs[_i] = arguments[_i];
            }
            for (var _a = 0, hrefs_2 = hrefs; _a < hrefs_2.length; _a++) {
                var href = hrefs_2[_a];
                this.doLoadCSS(href);
            }
        };
        CommonUtils.doLoadCSS = function (href) {
            return new Promise(function (resolve) {
                var link = document.createElement('link');
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", href);
                link.onload = function () {
                    resolve();
                };
                document.getElementsByTagName("head")[0].appendChild(link);
            });
        };
        CommonUtils.addCSS = function (cssText) {
            var style = document.createElement('style');
            var head = document.head || document.getElementsByTagName('head')[0];
            var id = '' + new Date().getTime();
            style.id = id;
            style.type = 'text/css';
            var textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
            head.appendChild(style);
            return id;
        };
        CommonUtils.withContextPath = function (path) {
            return contextPath + path;
        };
        return CommonUtils;
    }());
    exports.default = CommonUtils;
});
