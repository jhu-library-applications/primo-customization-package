export function itemRequestUrlInterceptor() {
  return {
    request: function (config) {
      if (config.url.includes('AlmaItemRequest')) {
        console.log('Request Config:', config);
      }
      return config;
    },
    response: function (response) {
      if (response.config.url.includes('AlmaItemRequest')) {
        try {
          response.data['services-arr'].services.forEach(function (service) {
            service['groups-list-map'].forEach(function (item) {
              item.pickupLocation.forEach(function (location) {
                if (location.key === "126006350007861$$LIBRARY") {
                  location.value = "Milton S. Eisenhower Library - Annex";
                }
              });
            });
          });
          console.log('Modified Response:', response.data);
        } catch (error) {
          console.log('Error modifying response:', error);
          return response;
        }
      }
      return response;
    },
    requestError: function (rejection) {
      if (rejection.config && rejection.config.url.includes('AlmaItemRequest')) {
        console.log('Request Error:', rejection);
      }
      return Promise.reject(rejection);
    },
    responseError: function (rejection) {
      if (rejection.config && rejection.config.url.includes('AlmaItemRequest')) {
        console.log('Response Error:', rejection);
      }
      return Promise.reject(rejection);
    }
  };
}
