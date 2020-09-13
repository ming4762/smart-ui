// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'

// @ts-ignore
import ApiService from 'js/common/utils/ApiService'
// @ts-ignore
import Md5Utils from 'js/common/utils/Md5Utils'

import UserUtils from '../../utils/UserUtils'

import Top from './Top'
import Footer from './Footer'

declare const contextPath: string

/**
 * 登录页面
 * @author shizhongming
 * 2020/9/7 10:44 下午
 */
export default class LoginPage extends PageBuilder {
	public build () {
		return page
	}
}

const page = {
	components: {
		Top,
		Footer
	},
	data (): any {
		return {
			state: {
				loginBtn: false
			},
			// @ts-ignore
			form: this.$form.createForm(this)
		}
	},
	methods: {
		/**
		 * 提交form
		 */
		handleSubmit (e: Event) {
			e.preventDefault()
			// @ts-ignore
			this.form.validateFields((err: any, { username, password1 }: any) => {
				if (!err) {
					this.state.loginBtn = true
					const password = Md5Utils.md5(username + password1 + '888888$#@', 2)
					ApiService.postAjax('public/auth/login', { username, password }).then((result) => {
						const { token } = result.data
						// 待完善
						ApiService.saveToken(token)
						UserUtils.saveUserData(result.data)
						window.location.href = contextPath + 'ui/system/home'
					}).catch((error) => {
						this.$message.error(error.message)
						console.error(error)
					}).finally(() => {
						this.state.loginBtn = false
					})
				}
			});
		}
	},
	// language=html
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
}
