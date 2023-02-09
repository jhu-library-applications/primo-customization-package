(function () {
    "use strict";
    'use strict';
var app = angular.module('viewCustom', ['angularLoad']);
    app.component('jhuTopBar', {
	templateUrl: "/primo-explore/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
    });

app.component('prmTopBarBefore', {
        bindings: {parentCtrl: `<`},
        template: `<jhu-top-bar></jhu-top-bar>`    
});
	
})();