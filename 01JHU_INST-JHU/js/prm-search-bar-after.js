(function () {
    "use strict";
    'use strict';

var app = angular.module('viewCustom', ['angularLoad']);

app.component('prmSearchBarAfter', {
        bindings: {parentCtrl: `<`},
        templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bar-after.html"  
});
	
})();
