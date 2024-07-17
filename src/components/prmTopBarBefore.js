export const prmTopBarBefore = {
  bindings: { parentCtrl: `<` },
  templateUrl: "/discovery/custom/01JHU_INST-JHU/html/prm-top-bar-before.html",
  controller: ['$scope', function ($scope) {
    var ctrl = this;

    ctrl.$onInit = function () {
      (function (w, d, s, l, i) {
        w[l] = w[l] || []; w[l].push({
          'gtm.start':
            new Date().getTime(), event: 'gtm.js'
        }); var f = d.getElementsByTagName(s)[0],
          j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : ''; j.async = true; j.src =
            'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
      })(window, document, 'script', 'dataLayer', 'GTM-KVWVGLP');
    }
  }]
};
