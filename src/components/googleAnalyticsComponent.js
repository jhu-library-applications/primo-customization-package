export const googleAnalyticsComponent = {
    template: '<div></div>',
    controller: class GoogleAnalyticsController {
      constructor($window) {
        this.$window = $window;
      }
  
      $onInit() {
        this.insertGoogleAnalytics();
      }
  
      insertGoogleAnalytics() {
        const script = document.createElement('script');
        script.async = true;
        script.src = 'https://www.googletagmanager.com/gtag/js?id=GTM-KVWVGLP'; // Replace GA_MEASUREMENT_ID with your actual ID
        document.head.appendChild(script);
  
        this.$window.dataLayer = this.$window.dataLayer || [];
        function gtag() {
          this.$window.dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', 'GTM-KVWVGLP');
      }
    },
    controllerAs: 'vm'
  };
  
  GoogleAnalyticsController.$inject = ['$window'];
  