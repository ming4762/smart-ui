define(["require", "exports", "./RightHeader", "../../../mixins/ThemeMixins"], function (require, exports, RightHeader_1, ThemeMixins_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        data() {
            return {
                logoSrc: contextPath + 'images/system/index/whiteLogo.png'
            };
        },
        components: {
            RightHeader: RightHeader_1.default
        },
        mixins: [
            ThemeMixins_1.default
        ],
        computed: {},
        template: `		
	<nav>
			<div :style="computedLeftHeaderStyle" class="navbar-header">
					<div class="navbar-brand navbar-brand-center site-gridmenu-toggle">
<!--							图标-->
							<img class="header-logo header-logo navbar-brand-logo d-sm-block d-lg-block d-none navbar-logo" :src="logoSrc"/>
							<div class="header-title">
                  <span>HPPS Portal</span>
							</div>
					</div>
			</div>
			<div :style="computedRightHeaderStyle" class="navbar-container container-fluid">
					<RightHeader/>
			</div>
	</nav>	
	`
    };
});
