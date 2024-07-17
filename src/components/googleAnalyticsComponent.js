export const googleAnalyticsComponent = {
  template: '<div></div>',
  controller: class GoogleAnalyticsController {
    static $inject = ['$window'];

    constructor($window) {
      this.$window = $window;
    }

    $onInit() {
      this.insertGoogleAnalytics();
    }

    insertGoogleAnalytics() {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-KVWVGLP'; // Replace GTM-KVWVGLP with your actual ID
      document.head.appendChild(script);

      this.$window.dataLayer = this.$window.dataLayer || [];
      const gtag = (...args) => {
        this.$window.dataLayer.push(args);
      };

      gtag('js', new Date());
      gtag('config', 'GTM-KVWVGLP');
    }
  },
  controllerAs: 'vm'
};
