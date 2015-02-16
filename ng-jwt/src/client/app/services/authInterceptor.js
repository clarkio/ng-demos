(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('authInterceptor', authInterceptor);

    /* @ngInject */
    function authInterceptor($rootScope, $q, $window, toastr) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                if ($window.sessionStorage.token) {
                    config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
                }
                return config;
            },
            responseError: function (rejection) {
                console.log(rejection);
                var msg = rejection.data + ': ' + rejection.config.url;
                toastr.error(msg);
                if (rejection.status === 401) {
                    // handle the case where the user is not authenticated
                }
                return $q.reject(rejection);
            }
        };
    }

    angular
        .module('app.core')
        .config(function ($httpProvider) {
            $httpProvider.interceptors.push('authInterceptor');
        });
})();