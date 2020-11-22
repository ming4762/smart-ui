define(["require", "exports", "./TopMenuList", "./TopOperation"], function (require, exports, TopMenuList_1, TopOperation_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.default = {
        components: {
            TopMenuList: TopMenuList_1.default,
            TopOperation: TopOperation_1.default
        },
        template: `
	<div class="collapse navbar-collapse navbar-collapse-toolbar">
			<TopMenuList class="nav navbar-toolbar navbar-left"/>
			<TopOperation class="nav navbar-toolbar navbar-right navbar-toolbar-right"/>
	</div>	
	`
    };
});
