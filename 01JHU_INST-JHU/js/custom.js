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

  var observerActive = false;

  function startObserver() {
    if (!observerActive) {
      observer.observe(document, { childList: true, subtree: true });
      observerActive = true;
    }
  }

  var observer = new MutationObserver(function () {
    var itemRequestElements = document.querySelectorAll('span[translate="AlmaItemRequest"]');
    var checkBorrowDirectSpans = document.querySelectorAll('span[translate="Check BorrowDirect"]');
    var checkIlliadSpans = document.querySelectorAll('span[translate="Go to Interlibrary Loan Form"]');

    var available = false;
    if (document.querySelector('prm-location-items .availability-status') && document.querySelector('prm-location-items .availability-status').textContent) {
      available = document.querySelector('prm-location-items .availability-status').textContent.indexOf('Available') === 0;
    }

    if (itemRequestElements && checkBorrowDirectSpans.length >= 1 && checkIlliadSpans.length >= 1 && available) {
      checkBorrowDirectSpans.forEach(function (checkBorrowDirectSpan) {
        checkBorrowDirectSpan.parentElement.style.display = "none";
      });

      checkIlliadSpans.forEach(function (checkIlliadSpan) {
        checkIlliadSpan.parentElement.style.display = "none";
      });

      document.querySelectorAll('.skewed-divider').forEach(function (skewedDivider) {
        skewedDivider.style.display = "none";
      });

      observer.disconnect();
      observerActive = false;
    }
  });

  // Initial observer start
  startObserver();

  // Restarting observer on click, if it's not active
  document.addEventListener('click', function () {
    startObserver();
  });
})();
