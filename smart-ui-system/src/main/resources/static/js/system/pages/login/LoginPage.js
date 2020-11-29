define(["require", "exports", "js/common/PageBuilder", "js/common/utils/ApiService", "js/common/utils/Md5Utils", "../../utils/UserUtils", "./Top", "./Footer"], function (require, exports, PageBuilder_1, ApiService_1, Md5Utils_1, UserUtils_1, Top_1, Footer_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class LoginPage extends PageBuilder_1.default {
        build() {
            return page;
        }
    }
    exports.default = LoginPage;
    const page = {
        components: {
            Top: Top_1.default,
            Footer: Footer_1.default
        },
        data() {
            return {
                state: {
                    loginBtn: false
                },
                form: this.$form.createForm(this)
            };
        },
        methods: {
            handleSubmit(e) {
                e.preventDefault();
                this.form.validateFields((err, { username, password: password1 }) => {
                    if (!err) {
                        this.state.loginBtn = true;
                        const password = Md5Utils_1.default.md5(username + password1 + '888888$#@', 2);
                        ApiService_1.default.postAjax('public/auth/login', { username, password }).then((result) => {
                            const { token } = result.data;
                            ApiService_1.default.saveToken(token);
                            UserUtils_1.default.saveUserData(result.data);
                            window.location.href = contextPath + 'ui/index';
                        }).catch((error) => {
                            this.$message.error(error.message);
                            console.error(error);
                        }).finally(() => {
                            this.state.loginBtn = false;
                        });
                    }
                });
            }
        },
        template: `
	<div class="full-height loginContainer">
			<Top class="top"/>
			<div class="main">
					<a-form
            @submit="handleSubmit"
            :form="form">
							<a-tabs
                :tabBarStyle="{ textAlign: 'center', borderBottom: 'unset' }">
									<a-tab-pane key="tab1" tab="账号密码登录">
											<a-form-item>
                          <a-input
                            size="large"
                            placeholder="请输入用户名"
                            v-decorator="[
                        		'username',
                        		{rules: [{ required: true, message: '请输入用户名' }], validateTrigger: 'blur'}
                        		]"
                            type="text">
                              <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                          </a-input>	
											</a-form-item>
											<a-form-item>
                          <a-input
                            size="large"
                            type="password"
                            autocomplete="false"
                            placeholder="请输入密码"
                            v-decorator="[
						                'password',
						                {rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}
						              ]"
						                          >
                              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
                          </a-input>
											</a-form-item>
									</a-tab-pane>
									<a-tab-pane key="tab2" tab="手机号登录"></a-tab-pane>
							</a-tabs>
							<a-form-item>
                  <a-button
                    size="large"
                    block
                    type="primary"
                    htmlType="submit"
                    class="login-button"
                    :loading="state.loginBtn"
                    :disabled="state.loginBtn"
                  >登录</a-button>
							</a-form-item>
					</a-form>
			</div>
			<Footer class="footer"/>
	</div>	
	`
    };
});
