export function configureInterceptors(app) {
  app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push('itemRequestUrlInterceptor');
  }]);
}
