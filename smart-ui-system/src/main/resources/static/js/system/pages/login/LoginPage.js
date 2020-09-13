var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
define(["require", "exports", "js/common/PageBuilder", "js/common/utils/ApiService", "js/common/utils/Md5Utils", "../../utils/UserUtils", "./Top", "./Footer"], function (require, exports, PageBuilder_1, ApiService_1, Md5Utils_1, UserUtils_1, Top_1, Footer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var LoginPage = (function (_super) {
        __extends(LoginPage, _super);
        function LoginPage() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        LoginPage.prototype.build = function () {
            return page;
        };
        return LoginPage;
    }(PageBuilder_1.default));
    exports.default = LoginPage;
    var page = {
        components: {
            Top: Top_1.default,
            Footer: Footer_1.default
        },
        data: function () {
            return {
                state: {
                    loginBtn: false
                },
                form: this.$form.createForm(this)
            };
        },
        methods: {
            handleSubmit: function (e) {
                var _this = this;
                e.preventDefault();
                this.form.validateFields(function (err, _a) {
                    var username = _a.username, password1 = _a.password1;
                    if (!err) {
                        _this.state.loginBtn = true;
                        var password = Md5Utils_1.default.md5(username + password1 + '888888$#@', 2);
                        ApiService_1.default.postAjax('public/auth/login', { username: username, password: password }).then(function (result) {
                            var token = result.data.token;
                            ApiService_1.default.saveToken(token);
                            UserUtils_1.default.saveUserData(result.data);
                            window.location.href = contextPath + 'ui/system/home';
                        }).catch(function (error) {
                            _this.$message.error(error.message);
                            console.error(error);
                        }).finally(function () {
                            _this.state.loginBtn = false;
                        });
                    }
                });
            }
        },
        template: "\n\t<div class=\"full-height loginContainer\">\n\t\t\t<Top class=\"top\"/>\n\t\t\t<div class=\"main\">\n\t\t\t\t\t<a-form\n            @submit=\"handleSubmit\"\n            :form=\"form\">\n\t\t\t\t\t\t\t<a-tabs\n                :tabBarStyle=\"{ textAlign: 'center', borderBottom: 'unset' }\">\n\t\t\t\t\t\t\t\t\t<a-tab-pane key=\"tab1\" tab=\"\u8D26\u53F7\u5BC6\u7801\u767B\u5F55\">\n\t\t\t\t\t\t\t\t\t\t\t<a-form-item>\n                          <a-input\n                            size=\"large\"\n                            placeholder=\"\u8BF7\u8F93\u5165\u7528\u6237\u540D\"\n                            v-decorator=\"[\n                        \t\t'username',\n                        \t\t{rules: [{ required: true, message: '\u8BF7\u8F93\u5165\u7528\u6237\u540D' }], validateTrigger: 'blur'}\n                        \t\t]\"\n                            type=\"text\">\n                              <a-icon slot=\"prefix\" type=\"user\" :style=\"{ color: 'rgba(0,0,0,.25)' }\"/>\n                          </a-input>\t\n\t\t\t\t\t\t\t\t\t\t\t</a-form-item>\n\t\t\t\t\t\t\t\t\t\t\t<a-form-item>\n                          <a-input\n                            size=\"large\"\n                            type=\"password\"\n                            autocomplete=\"false\"\n                            placeholder=\"\u8BF7\u8F93\u5165\u5BC6\u7801\"\n                            v-decorator=\"[\n\t\t\t\t\t\t                'password',\n\t\t\t\t\t\t                {rules: [{ required: true, message: '\u8BF7\u8F93\u5165\u5BC6\u7801' }], validateTrigger: 'blur'}\n\t\t\t\t\t\t              ]\"\n\t\t\t\t\t\t                          >\n                              <a-icon slot=\"prefix\" type=\"lock\" :style=\"{ color: 'rgba(0,0,0,.25)' }\"/>\n                          </a-input>\n\t\t\t\t\t\t\t\t\t\t\t</a-form-item>\n\t\t\t\t\t\t\t\t\t</a-tab-pane>\n\t\t\t\t\t\t\t\t\t<a-tab-pane key=\"tab2\" tab=\"\u624B\u673A\u53F7\u767B\u5F55\"></a-tab-pane>\n\t\t\t\t\t\t\t</a-tabs>\n\t\t\t\t\t\t\t<a-form-item>\n                  <a-button\n                    size=\"large\"\n                    block\n                    type=\"primary\"\n                    htmlType=\"submit\"\n                    class=\"login-button\"\n                    :loading=\"state.loginBtn\"\n                    :disabled=\"state.loginBtn\"\n                  >\u767B\u5F55</a-button>\n\t\t\t\t\t\t\t</a-form-item>\n\t\t\t\t\t</a-form>\n\t\t\t</div>\n\t\t\t<Footer class=\"footer\"/>\n\t</div>\t\n\t"
    };
});
