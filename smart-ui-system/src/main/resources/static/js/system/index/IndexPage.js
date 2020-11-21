define(["require", "exports", "js/common/PageBuilder"], function (require, exports, PageBuilder_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    class IndexPage extends PageBuilder_1.default {
        initPage() {
            this.init();
        }
        build() {
            return page;
        }
    }
    exports.default = IndexPage;
    const page = {
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
    };
});
