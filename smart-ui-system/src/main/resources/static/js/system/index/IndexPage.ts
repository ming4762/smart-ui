// @ts-ignore
import PageBuilder from 'js/common/PageBuilder'

export default class IndexPage extends PageBuilder {
	public initPage () {
		// @ts-ignore
		this.init()
	}

	protected build() {
		return page
	}
}

const page = {
	// language=html
	template: `
	<div class="full-height">
			<!--		头部信息		-->
			<nav class="site-navbar navbar navbar-default navbar-fixed-top navbar-inverse  bg-blue-600">
			</nav>
			<!--		左侧菜单栏		-->
			<nav class="site-menubar site-menubar-dark"></nav>
			<!--		导航栏		-->
			<nav class="site-contabs"></nav>
			<!--		主体		-->
			<main class="site-page" style="height: calc(100% - 42px)"></main>
      <!--		FOOTER		-->
			<footer class="site-footer"></footer>
	</div>
	`
}
