(function () {
  "use strict";

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

  var observer = new MutationObserver(function () {
    // Item request information
    var itemRequestElements = document.querySelectorAll('span[translate="AlmaItemRequest"]');

    // Our General Electronic Service links
    var checkBorrowDirectSpans = document.querySelectorAll('span[translate="Check BorrowDirect"]');
    var checkIlliadSpans = document.querySelectorAll('span[translate="Go to Interlibrary Loan Form"]');

    // Is the item available or not? 
   if (document.querySelector('.availability-status') && document.querySelector('.availability-status').textContent) {
    var available = document.querySelector('.availability-status').textContent.indexOf('Available') === 0
   }
   
    if (itemRequestElements && checkBorrowDirectSpans.length >= 1 && checkIlliadSpans.length >= 1 && available) {
      checkBorrowDirectSpans.forEach(function (checkBorrowDirectSpan) {
        checkBorrowDirectSpan.parentElement.style.display = "none";
      });

      checkIlliadSpans.forEach(function (checkIlliadSpan) {
        checkIlliadSpan.parentElement.style.display = "none";
      });

      document.querySelectorAll('.skewed-divider').forEach(function (skewedDivider) {
        skewedDivider.style.display = "none"
      });

      observer.disconnect();
    }
  });


  observer.observe(document, { childList: true, subtree: true });

})();
