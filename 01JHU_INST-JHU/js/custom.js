(function () {
    "use strict";
    'use strict';
    
    var app = angular.module('viewCustom', ['angularLoad']);

    app.component('prmTopBarBefore', {
        bindings: { parentCtrl: `<` },
        templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html"
    });

    app.component('prmSearchBarAfter', {
        bindings: { parentCtrl: `<` },
        templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-bar-after.html"
    });

    app.component('prmSearchResultThumbnailContainerAfter', {
        bindings: { parentCtrl: `<` },
        templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-search-result-thumbnail-container-after.html"
    });

     
})();
