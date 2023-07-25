(function () {    
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

document.addEventListener("DOMContentLoaded", function () {
  const itemRequestElement = document.querySelector('span[translate="AlmaItemRequest"]');
  const checkBorrowDirectSpan = document.querySelector('span[translate="Check BorrowDirect"]');

  if (itemRequestElement) {
    checkBorrowDirectSpan.style.display = "none";
  }
});
