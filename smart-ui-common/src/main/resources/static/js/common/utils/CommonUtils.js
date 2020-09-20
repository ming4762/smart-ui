var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class CommonUtils {
        static createUUID() {
            let s = [];
            let hexDigits = '0123456789abcdef';
            for (let i = 0; i < 36; i++) {
                s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
            }
            s[14] = '4';
            s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);
            s[8] = s[13] = s[18] = s[23] = '-';
            return s.join('');
        }
        static clone(object) {
            if (object == null) {
                return null;
            }
            let objectStr = JSON.stringify(object);
            return JSON.parse(objectStr);
        }
        static getObjectByKeys(keys, objectList) {
            if (objectList && keys) {
                let resultList = [];
                objectList.forEach(object => {
                    let result = {};
                    keys.forEach(key => {
                        result[key] = object[key];
                    });
                    resultList.push(result);
                });
                return resultList;
            }
            return [];
        }
        static fullScreen(full) {
            if (full) {
                this.inFullScreen();
            }
            else {
                this.exitFullscreen();
            }
        }
        static inFullScreen() {
            const element = document.documentElement;
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
        }
        static exitFullscreen() {
            const doc = document;
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
        }
        static loadJS(...urls) {
            return __awaiter(this, void 0, void 0, function* () {
                const promiseList = urls.map(item => {
                    return this.doLoadJS(item);
                });
                return Promise.all(promiseList);
            });
        }
        static loadJSAsync(...urls) {
            for (let url of urls) {
                this.doLoadJS(url);
            }
        }
        static doLoadJS(url) {
            return new Promise((resolve) => {
                const script = document.createElement('script');
                script.type = 'text/javascript';
                script.onload = () => {
                    resolve();
                };
                script.src = url;
                document.body.appendChild(script);
            });
        }
        static loadCSS(...hrefs) {
            return __awaiter(this, void 0, void 0, function* () {
                for (let href of hrefs) {
                    yield this.doLoadCSS(href);
                }
            });
        }
        static loadCSSAsync(...hrefs) {
            for (let href of hrefs) {
                this.doLoadCSS(href);
            }
        }
        static doLoadCSS(href) {
            return new Promise((resolve) => {
                const link = document.createElement('link');
                link.setAttribute("rel", "stylesheet");
                link.setAttribute("type", "text/css");
                link.setAttribute("href", href);
                link.onload = () => {
                    resolve();
                };
                document.getElementsByTagName("head")[0].appendChild(link);
            });
        }
        static addCSS(cssText) {
            const style = document.createElement('style');
            const head = document.head || document.getElementsByTagName('head')[0];
            const id = '' + new Date().getTime();
            style.id = id;
            style.type = 'text/css';
            const textNode = document.createTextNode(cssText);
            style.appendChild(textNode);
            head.appendChild(style);
            return id;
        }
        static withContextPath(path) {
            return contextPath + path;
        }
    }
    exports.default = CommonUtils;
});
