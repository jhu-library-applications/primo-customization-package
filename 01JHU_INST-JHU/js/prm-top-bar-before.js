(function () {
    "use strict";
    'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

app.component('prmTopBarBefore', {
        bindings: {parentCtrl: `<`},
        templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"  
});
	
})();
